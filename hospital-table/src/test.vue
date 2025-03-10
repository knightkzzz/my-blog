<template>
  <div class="hospital-table-container">
    <h2>医患沟通满意度调查表</h2>
    <el-table
      v-loading="loading"
      :data="tableData"
      border
      style="width: fit-content; margin: 0 auto;"
      :span-method="objectSpanMethod"
      :header-cell-style="headerCellStyle"
    >
      <!-- 院区列 -->
      <el-table-column prop="department" label="院区" width="120"></el-table-column>
      
      <!-- 动态生成医患沟通部分 -->
      <template v-if="isReady">
        <el-table-column 
          v-for="(section, sectionKey) in columnsConfig"
          :key="sectionKey"
          :label="section.label" 
          align="center"
        >
          <!-- 使用v-for循环生成每个分组 -->
          <el-table-column 
            v-for="(group, groupKey) in section.children"
            :key="sectionKey + '-' + groupKey"
            :label="group.label" 
            align="center"
          >
            <el-table-column 
              v-for="(col, index) in group.children"
              :key="sectionKey + '-' + groupKey + '-' + index"
              :prop="col.prop"
              :label="col.label"
              width="80"
              :label-class-name="col.textColor ? (col.textColor === 'red' ? 'red-label' : 'blue-label') : ''"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import { fetchHospitalCommunicationData } from './mock-api.js';

export default {
  name: 'HospitalCommunicationTable',
  data() {
    return {
      loading: false,
      tableData: [],
      columnsConfig: {}, // 存储列配置
      isReady: false // 控制动态列的渲染时机
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    // 获取数据
    async fetchData() {
      this.loading = true;
      try {
        const response = await fetchHospitalCommunicationData();
        if (response.code === 200) {
          // 保存列配置
          this.columnsConfig = response.data.columns;
          // 转换API数据为表格所需格式
          this.tableData = this.transformApiData(response.data.departments);
          // 设置准备就绪标志
          this.$nextTick(() => {
            this.isReady = true;
          });
        } else {
          this.$message.error('获取数据失败');
        }
      } catch (error) {
        console.error('获取数据出错:', error);
        this.$message.error('获取数据出错');
      } finally {
        this.loading = false;
      }
    },
    
    // 转换API数据为表格所需格式
    transformApiData(departments) {
      return departments.map(dept => {
        // 创建基础数据对象，包含院区名称
        const rowData = {
          department: dept.name
        };

        try {
          // 遍历columns配置，根据配置生成数据
          Object.entries(this.columnsConfig).forEach(([sectionKey, section]) => {
            // 获取部分数据（医患沟通或护患沟通）
            const sectionData = dept[sectionKey];
            if (!sectionData) {
              console.warn(`Missing section data for ${sectionKey} in department ${dept.name}`);
              return;
            }
            
            // 遍历每个分组（态度或方法）
            Object.entries(section.children).forEach(([groupKey, group]) => {
              // 获取分组数据
              const groupData = sectionData[groupKey];
              if (!groupData) {
                console.warn(`Missing group data for ${groupKey} in section ${sectionKey} for department ${dept.name}`);
                return;
              }
              
              // 遍历每个具体的列
              group.children.forEach(col => {
                try {
                  // 从label中提取数据key
                  // if (col.label === '出院Q3') {
                  //   rowData[col.prop] = groupData.outputQ3 || 'N/A';
                  // } else {
                  //   const dataKey = col.label.replace('Q', '');
                  //   const value = groupData[`Q${dataKey}`];
                  //   rowData[col.prop] = value || 'N/A';
                  // }
                  const value = groupData[col.prop];
                  rowData[col.prop] = value || 'N/A';
                } catch (error) {
                  console.error(`Error processing column ${col.label} for department ${dept.name}:`, error);
                  rowData[col.prop] = 'Error';
                }
              });
            });
          });
        } catch (error) {
          console.error(`Error processing department ${dept.name}:`, error);
        }

        return rowData;
      });
    },
    
    // 处理单元格合并
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log(rowIndex, column.label);

      if(rowIndex >=0 && columnIndex === 1){
        
        return {
          rowspan: 1,
          colspan: 3
        };
      }
      
      // 这里不需要合并单元格，因为表格结构已经通过嵌套表头实现
      return {
        rowspan: 1,
        colspan: 1
      };
    },
    
    // 设置表头单元格样式
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      // 院区列
      if (column.label === '院区') {
        return {
          backgroundColor: '#f5f7fa',
          color: '#000'
        };
      }
      
      // 查找列配置
      const findColumnConfig = () => {
        // 遍历所有部分
        for (const sectionKey in this.columnsConfig) {
          const section = this.columnsConfig[sectionKey];
          
          // 检查主标题
          if (section.label === column.label) {
            return {
              backgroundColor: section.backgroundColor,
              color: '#000'
            };
          }
          
          // 检查分组标题
          for (const groupKey in section.children) {
            const group = section.children[groupKey];
            
            if (group.label === column.label && column.parent && column.parent.label === section.label) {
              return {
                backgroundColor: section.backgroundColor,
                color: '#000'
              };
            }
            
            // 检查具体列
            for (const col of group.children) {
              if (col.label === column.label) {
                return {
                  backgroundColor: col.backgroundColor,
                  color: col.textColor || '#000'
                };
              }
            }
          }
        }
        
        return null;
      };
      
      const style = findColumnConfig();
      if (style) {
        return style;
      }
      
      // 默认样式
      return {
        backgroundColor: '#f5f7fa',
        color: '#000'
      };
    }
  }
}
</script>

<style scoped>
.hospital-table-container {
  margin: 20px;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", Arial, sans-serif;
  overflow-x: auto;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.red-label {
  color: red;
}

.blue-label {
  color: #409EFF;
}

/* 覆盖element-ui的默认样式 */
/deep/ .el-table th {
  text-align: center;
  padding: 8px 0;
}

/deep/ .el-table .cell {
  text-align: center;
  padding: 8px 0;
  white-space: nowrap;
}

/deep/ .el-table--border th, /deep/ .el-table--border td {
  border-right: 1px solid #EBEEF5;
}

/deep/ .el-table__header-wrapper th {
  background-color: #f5f7fa;
  color: #606266;
  font-weight: bold;
}

/deep/ .el-table {
  display: inline-block;
  min-width: auto !important;
}

/deep/ .el-table__body-wrapper {
  overflow-x: hidden;
}
</style> 