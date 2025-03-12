import { Button } from 'flowbite-react';

/**
 * カスタマイズ可能なテキストおよび追加プロパティを使用して、Button要素をレンダリングする関数コンポーネント。
 *
 * @param {Object} props - コンポーネントに渡されるプロパティ。
 * @param {string} props.text - ボタン内に表示されるテキスト。
 * @param {...Object} props.otherProps - Buttonコンポーネントに渡されるその他のプロパティ。
 * @return {JSX.Element} 指定されたテキストとプロパティを持つButtonコンポーネント。
 */
export default function CustomButton({ text, ...props }) {
  return <Button {...props}>{text}</Button>;
}
