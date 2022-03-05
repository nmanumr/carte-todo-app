import c from 'classnames';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-initials-sprites';

interface Props {
  user: { username: string, avatar: string };
  classNames: string;
}

export default function UserAvatar({
  user: { username, avatar }, classNames,
}: Props) {
  if (!avatar) {
    const svg = createAvatar(style, { seed: username });

    // eslint-disable-next-line react/no-danger
    return <div className={c('rounded-full overflow-hidden', classNames)} dangerouslySetInnerHTML={{ __html: svg }} />;
  }

  return (
    <img alt={username} src={avatar} className={c('rounded-full overflow-hidden', classNames)} />
  );
}
