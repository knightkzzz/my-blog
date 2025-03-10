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

# 优化
**主要是从打包、构建速度与包体积两个层面进行优化**
- **构建速度**
- **包体积**
    1. TreeShaking<br>
    2. Code Splitting<br>
    3. 压缩<br>
