# 核心概念
- entry: 项目入口文件
- output 输出bundle文件路径
- module webpack在构建过程中的构建对象，及被loader处理过的文件
- plugin 插件
- loader 文件转换器
- bundle 构建完成的产物，及输出到目录的js文件
- chunk 构建过程中的产物，及代码块，一个Chunk可以包含多个Module，若配置了文件分割，可能会生成多个Chunk
- moduleGraph 模块依赖图，记录了模块之间的依赖关系

---

# 构建主流程
  本质上webpack是一个壳，里面封装了各种内置插件以及定义了各种流程，webpack只是定义了一个流水线让插件可以按流程进行工作，各个插件完成具体的功能
1. **初始化**
  - 初始化Compiler
  - 初始化options
  - 调用外部插件
  - 初始化环境environment
  - 处理入口参数
  - 加载内部插件
  - 初始化查找器
  - **标志初始化完毕hook --- initialize**
2. 编译与构建
  - **标志进入编译阶段hook --- run**
  - 准备Compilation的参数(normalModuleFactory,contextModuleFactory)
  - 创建Compilation，标志创建完成的hook --- compilation，标志一个新的Compilation触发hook --- watchRun
  - **标志进入构建阶段hook --- make**
  - 通过addEntry方法把入口添加到模块树中
  - 根据模块类型通过normalModuleFactory或者contextModuleFactory生成Moudle对象
  - 通过buildModule方法对模块进行构建，构建过程会调用loader对模块进行处理，将匹配到的文件转义一次，接着会调用parser对文件进行解析，生成AST，进行遍历转换，最后生成依赖关系，此过程会进行递归处理，最终完成所有模块的构建，形成ModuleGraph
  - 标志构建完成的hook --- finishModules
  - **标志进入封存阶段的hook --- seal,封存Compilation,生成chunk图**
  - **标志进入优化阶段hook --- optimize,这一阶段对chunk以及Module进行优化**
  - **进入代码生成阶段hook --- processAssets,这一阶段会计算Hash值以及根据chunk图生成代码块**
3. 输出
  - 标志编译与构建结束hook --- afterCompile
  - **标志进入输出阶段hook --- emit,这里会循环输出每个资源**
  - 标志输出资源到output目录hook --- afterEmit
  - **标志输出完成hook --- done**
---


# Loader
**本质上是文件转换器，例如.vue文件、.ejs文件，自定义要处理的文件等**
- 同步Loader直接返回处理过的content
```js
module.exports = function (content, map, meta) {
  return someSyncOperation(content);
};
```
- 异步Loader通过async返回callback对处理过的content进行返回
```js
module.exports = function (content, map, meta) {
  var callback = this.async();
  someAsyncOperation(content, function (err, result) {
    if (err) return callback(err);
    callback(null, result, map, meta);
  });
};
```
- 常用的Loader

---

# Plugin
**本质上是在webpack构建的各个生命周期中进行对资源的处理**
1. 自定义插件常用的hooks
 -  **Compiler Hooks**
    1. emit: 在确定好文件输出内容后，将文件输出到output目录前触发。
    2. afterEmit: 在文件输出到output目录后触发。
    3. compilation: 当一个新compilation创建时触发，compilation对象包含了当前的模块、编译生成资源、变化的文件等信息。
    4. watchRun: 在监听模式下，当出现一个新的Compilation时触发
    5. done: 在完成所有编译后触发，无论成功或失败。
 -  **Compilation Hooks**
    1. optimize: 在优化步骤之前调用，可以用来分析或修改模块。
    2. processAssets:允许插件在生成文件到output目录前添加额外的资源。
    3. optimizeModules: 在优化模块后调用，可以用来进一步优化模块。
    4. optimizeChunks: 在优化chunks后调用，可以用来进一步优化chunks。

---

# 优化
**主要是从打包、构建速度与包体积两个层面进行优化**
- **构建速度**
- **包体积**
    1. **TreeShaking**<br>
    触发条件：<br>
                <span style="margin-left: 1em;">使用解构的方式导入包</span><br>
                <span style="margin-left: 1em;">要导入的包必须是ESM规范，且采用export导出</span><br>
                <span style="margin-left: 1em;">如果是单个文件的TreeShaking，在webpack中要开启production模式才能触发</span>
    2. **Code Splitting**<br>
    - 通过在optimization配置splitChunks进行代码分割，默认会分割node_modules中的包
    - 分包时可以设置minSize,表示最小分割大小，当模块大于minSize时才会进行分割
    - 分包时可以设置name,表示分包名称
    - 分包时可以通过设置cacheGroups针对某个包进行单独分割，要注意的是cacheGroups会受到minSize的影响
    - 举个例子你的minSize设置为300kb，分包名为common，打出的bundle为700kb，那么此时会分割成bundle.js和common.js,如果此时common.js大于300kb，那么就会针对于cacheGroups进行进一步分割，如果小于300kb，那么就不会进行分割
    3. **压缩**<br>
    - 在optimization配置minimize中开启
    - 在optimization.minimizer中配置压缩的插件

---

# webpack-dev-server
**webpack-dev-server是webpack的扩展，用于提供一个本地服务器，处理各种资源并返回**
- 本质上是express的中间件，用于监听用户请求的资源并返回相应的结果
- 内部使用了MemoryFileSystem,将编译的结果存储在内存中，避免了从硬盘读取文件信息性能低下
    1. 首先会初始化内存文件系统
    2. 当用户请求资源时，会先对请求的路径进行处理
    3. 判断有没有编译成功，没有则进行webpack编译，会根据请求的路径生成一个路径树的object，key是资源名，value存储的是二进制数据，映射成webpack对其编译的结果
    4. 根据用户请求的资源从内存文件系统中寻找对应的内容以及content-type，并响应给客户端
    5. 再次发起资源请求时重新执行2-4步骤