import '@testing-library/jest-dom/extend-expect'; // 导入测试库扩展，以添加更多的断言方法
import axios from 'axios';

// 设置 axios 的默认模拟实现，以便在整个测试套件中重复使用
jest.mock('axios');

// 在每个测试运行之前进行一些全局设置
beforeEach(() => {
  // 模拟 axios.post 函数返回的数据
  const mockResponse = {
    data: {
      token: 'mockAccessToken',
      userID: 'mockUserID',
    },
  };

  // 模拟 axios.post 函数的解决值
  axios.post.mockResolvedValue(mockResponse);
});

// 在每个测试运行之后进行一些全局清理
afterEach(() => {
  // 清除 axios.post 的模拟
  axios.post.mockReset();
});

// 如果你需要设置更多的全局测试配置，可以在这里添加
