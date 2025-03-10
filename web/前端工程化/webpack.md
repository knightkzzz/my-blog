# 核心概念
- entry: 项目入口文件
- output 输出bundle文件路径
- module webpack在构建过程中的构建对象
- plugin 插件
- loader 文件转换器
- bundle 构建完成的产物
- chunk 构建过程中的产物

---

# 构建主流程
1. 初始化参数
2. 开始编译
3. 确定入口
4. 编译模块
5. 完成构建
6. 输出结果

---


# Loader
**本质上是文件转换器，例如.vue文件、.ejs文件，自定义要处理的文件等**

---

# Plugin
**本质上是在webpack构建的各个生命周期中进行对资源的处理**
1. 自定义插件常用的hooks
 -  **Compiler Hooks**
    1. emit: 在确定好文件输出内容后，将文件输出到output目录前触发。
    2. compilation: 当一个新compilation创建时触发，compilation对象包含了当前的模块、编译生成资源、变化的文件等信息。
    3. done: 在完成所有编译后触发，无论成功或失败。
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
**webpack-dev-server是webpack的扩展，用于提供一个本地服务器，并自动刷新浏览器**
