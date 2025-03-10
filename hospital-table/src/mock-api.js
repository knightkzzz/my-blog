// 模拟后端API返回的数据格式
export const mockApiResponse = {
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
            doctorAttitudeQ2: "99.5%",
            doctorAttitudeQ3: "97.2%",
            doctorAttitudeQ11: "96.8%"
          },
          method: {
            doctorMethodQ4: "95.3%",
            doctorMethodQ5: "94.7%",
            doctorMethodOutput: "93.9%"
          }
        },
        nurseCommunication: {
          attitude: {
            nurseAttitudeQ6: "99.1%",
            nurseAttitudeQ7: "98.7%",
            nurseAttitudeQ11: "97.5%"
          },
          method: {
            nurseMethodQ8: "96.2%",
            nurseMethodOutput: "95.8%"
          } 
        }
      },
      {
        id: 2,
        name: "金银湖院区",
        doctorCommunication: {
          attitude: {
            doctorAttitudeQ2: "97.8%",
            doctorAttitudeQ3: "96.5%",
            doctorAttitudeQ11: "95.9%"
          },
          method: {
            doctorMethodQ4: "94.2%",
            doctorMethodQ5: "93.8%",
            doctorMethodOutput: "92.5%"
          }
        },
        nurseCommunication: {
          attitude: {
            nurseAttitudeQ6: "98.3%",
            nurseAttitudeQ7: "97.9%",
            nurseAttitudeQ11: "96.7%"
          },
          method: {
            nurseMethodQ8: "95.4%",
            nurseMethodOutput: "94.6%"
          }
        }
      },
      {
        id: 3,
        name: "士院区",
        doctorCommunication: {
          attitude: {
            doctorAttitudeQ2: "96.9%",
            doctorAttitudeQ3: "95.7%",
            doctorAttitudeQ11: "94.8%"
          },
          method: {
            doctorMethodQ4: "93.5%",
            doctorMethodQ5: "92.9%",
            doctorMethodOutput: "91.7%"
          }
        },
        nurseCommunication: {
          attitude: {
            nurseAttitudeQ6: "97.6%",
            nurseAttitudeQ7: "96.8%",
            nurseAttitudeQ11: "95.5%"
          },
          method: {
            nurseMethodQ8: "94.3%",
            nurseMethodOutput: "93.2%"
          }
        }
      }
    ]
  }
};

// 模拟API请求函数
export function fetchHospitalCommunicationData() {
  return new Promise((resolve) => {
    // 模拟网络延迟
    setTimeout(() => {
      resolve(mockApiResponse);
    }, 500);
  });
} 