# 医患沟通满意度调查表

这是一个使用Vue2和Element UI开发的医患沟通满意度调查表格展示项目。

## 功能特点

- 使用Vue2框架开发
- 使用Element UI作为UI组件库
- 模拟后端API数据
- **动态表格列配置**：表格列结构完全由后端数据决定，前端代码不需要硬编码
- 高度还原设计图中的表格样式
- 支持加载状态显示

## 项目结构

```
├── public/
│   └── index.html        # HTML入口文件
├── src/
│   ├── main.js           # Vue入口文件
│   ├── test.vue          # 主要组件文件
│   └── mock-api.js       # 模拟API数据
├── package.json          # 项目依赖配置
└── README.md             # 项目说明文档
```

## 安装依赖

```bash
npm install
```

## 运行项目

```bash
npm run serve
```

## 构建项目

```bash
npm run build
```

## 数据格式说明

模拟的后端API数据格式如下：

```javascript
{
  code: 200,
  message: "success",
  data: {
    // 表格列配置
    columns: {
      // 医患沟通部分
      doctorCommunication: {
        label: "医患沟通",
        children: {
          // 态度部分
          attitude: {
            label: "态度",
            children: [
              { prop: "doctorAttitudeQ2", label: "Q2", width: 80, backgroundColor: "#c2e7b0" },
              { prop: "doctorAttitudeQ3", label: "Q3", width: 80, backgroundColor: "#c2e7b0" },
              { prop: "doctorAttitudeQ11", label: "Q11", width: 80, backgroundColor: "#c2e7b0", textColor: "red" }
            ]
          },
          // 方法部分
          method: {
            label: "方法",
            children: [
              { prop: "doctorMethodQ4", label: "Q4", width: 80, backgroundColor: "#a4c1f7" },
              { prop: "doctorMethodQ5", label: "Q5", width: 80, backgroundColor: "#a4c1f7" },
              { prop: "doctorMethodOutput", label: "出院Q3", width: 80, backgroundColor: "#a4c1f7", textColor: "#409EFF" }
            ]
          }
        },
        backgroundColor: "#a4c1f7"
      },
      // 护患沟通部分
      nurseCommunication: {
        label: "护患沟通",
        children: {
          // 态度部分
          attitude: {
            label: "态度",
            children: [
              { prop: "nurseAttitudeQ6", label: "Q6", width: 80, backgroundColor: "#c2e7b0" },
              { prop: "nurseAttitudeQ7", label: "Q7", width: 80, backgroundColor: "#c2e7b0" },
              { prop: "nurseAttitudeQ11", label: "Q11", width: 80, backgroundColor: "#c2e7b0", textColor: "red" }
            ]
          },
          // 方法部分
          method: {
            label: "方法",
            children: [
              { prop: "nurseMethodQ8", label: "Q8", width: 80, backgroundColor: "#a4c1f7" },
              { prop: "nurseMethodOutput", label: "出院Q3", width: 80, backgroundColor: "#a4c1f7", textColor: "#409EFF" }
            ]
          }
        },
        backgroundColor: "#c2e7b0"
      }
    },
    // 表格数据
    departments: [
      {
        id: 1,
        name: "东谷院区",
        doctorCommunication: {
          attitude: {
            Q2: "98.5%",
            Q3: "97.2%",
            Q11: "96.8%"
          },
          method: {
            Q4: "95.3%",
            Q5: "94.7%",
            outputQ3: "93.9%"
          }
        },
        nurseCommunication: {
          attitude: {
            Q6: "99.1%",
            Q7: "98.7%",
            Q11: "97.5%"
          },
          method: {
            Q8: "96.2%",
            outputQ3: "95.8%"
          }
        }
      },
      // 更多院区数据...
    ]
  }
}
```

## 表格说明

表格展示了不同院区的医患沟通和护患沟通满意度数据，包括：

- 医患沟通
  - 态度 (Q2, Q3, Q11)
  - 方法 (Q4, Q5, 出院Q3)
- 护患沟通
  - 态度 (Q6, Q7, Q11)
  - 方法 (Q8, 出院Q3)

## 动态列配置

表格列的配置完全由后端数据决定，具有以下特点：

1. **完全动态化**：表格的结构完全由后端数据决定，前端代码不需要硬编码任何列结构
2. **高度灵活**：可以轻松添加、删除或修改列，只需要修改后端返回的数据即可
3. **易于维护**：所有的列配置都集中在一个地方，便于统一管理和修改
4. **可扩展性强**：如果需要添加新的列或者修改现有列的属性，只需要修改接口返回的数据即可

## 自定义样式

表格使用了自定义样式来匹配设计图：
- 医患沟通部分使用蓝色背景
- 护患沟通部分使用绿色背景
- Q11指标使用红色文字
- 出院Q3指标使用蓝色文字 