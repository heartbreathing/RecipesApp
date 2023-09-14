import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios'; // 模拟 axios
import { Auth } from './auth';

// 模拟 axios.post 函数
jest.mock('axios');

describe('Login Component', () => {
  it('should render login form', () => {
    const { getByLabelText, getByText } = render(<Auth />);

    // 通过标签文本获取表单元素
    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('should handle login submission', async () => {
    // 模拟 axios.post 函数返回的数据
    const mockResponse = {
      data: {
        token: 'mockAccessToken',
        userID: 'mockUserID',
      },
    };

    axios.post.mockResolvedValue(mockResponse); // 模拟 axios.post 函数的解决值

    const { getByLabelText, getByText } = render(<Auth />);

    const usernameInput = getByLabelText('Username:');
    const passwordInput = getByLabelText('Password:');
    const loginButton = getByText('Login');

    // 模拟用户输入
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // 模拟用户点击登录按钮
    fireEvent.click(loginButton);

    // 等待异步操作完成
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:3001/auth/login',
        {
          username: 'testuser',
          password: 'testpassword',
        }
      );
    });

    // 在登录成功后，检查页面是否有相应的更新
    // 例如，您可以检查是否有跳转或是否设置了Cookie等
    // 这里根据您的应用行为进行断言

    // 例如，检查是否发生了页面跳转
    // 使用适当的测试库和方法来检查页面跳转
    // 这里假设使用 react-router-dom 的 useNavigate
    // 您可以模拟 useNavigate，并检查是否调用了 navigate 函数
    // const navigate = useNavigate();
    // expect(navigate).toHaveBeenCalledWith('/');

    // 检查是否设置了 Cookie
    // 使用适当的测试库和方法来检查 Cookie 设置
    // 例如，使用 react-cookie 的 useCookies
    // const [cookies, _] = useCookies(['access_token']);
    // expect(cookies['access_token']).toEqual('mockAccessToken');
  });
});
