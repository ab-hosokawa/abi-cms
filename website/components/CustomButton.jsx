import { Button } from 'flowbite-react';

/**
 * カスタマイズ可能なテキストおよび追加プロパティを使用して、Button要素をレンダリングする関数コンポーネント。
 *
 * @param {Object} props - コンポーネントに渡されるプロパティ。
 * @param {string} props.text - ボタン内に表示されるテキスト。
 * @param {JSX.Element} props.icon - ボタン内のアイコン
 * @param {...Object} props.otherProps - Buttonコンポーネントに渡されるその他のプロパティ。
 * @return {JSX.Element} 指定されたテキストとプロパティを持つButtonコンポーネント。
 */
export default function CustomButton({ text, icon = null, ...props }) {
  return (
    <Button {...props}>
      {!icon ? (
        text
      ) : (
        <>
          <span>{text}</span>
          <span>{icon}</span>
        </>
      )}
    </Button>
  );
}
