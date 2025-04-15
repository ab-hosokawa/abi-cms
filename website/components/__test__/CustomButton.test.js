// CustomButton.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CustomButton from 'components/atoms/CustomButton.jsx';

describe('CustomButtonコンポーネント', () => {
  // 基本的なレンダリングテスト
  test('ボタンが正しくレンダリングされる', () => {
    render(<CustomButton text={'Default'} type={'button'} />);
    const buttonElement = screen.getByRole('button', { name: 'Default' });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveAttribute('type', 'button');
  });

  // スタイルのテスト
  test('ボタンが正しいスタイルクラスを持っている', () => {
    render(<CustomButton type={'button'} className={'text-white bg-blue-700 rounded-lg'} />);
    const buttonElement = screen.getByRole('button');

    // 主要なTailwindクラスが適用されているかを確認
    expect(buttonElement).toHaveClass('text-white');
    expect(buttonElement).toHaveClass('bg-blue-700');
    expect(buttonElement).toHaveClass('rounded-lg');
  });

  // クリックイベントのテスト
  test('ボタンがクリック可能である', async () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick} />);

    const buttonElement = screen.getByRole('button');
    await userEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // プロップスのテスト
  test('子要素としてのテキストを正しく表示する', () => {
    render(<CustomButton text={'カスタムテキスト'} />);
    const buttonElement = screen.getByText('カスタムテキスト');
    expect(buttonElement).toBeInTheDocument();
  });

  // disabledプロパティのテスト
  test('disabled属性が正しく機能する', () => {
    render(<CustomButton disabled={true} />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  // スナップショットテスト
  test('スナップショットが一致する', () => {
    const { container } = render(<CustomButton />);
    expect(container).toMatchSnapshot();
  });
});
