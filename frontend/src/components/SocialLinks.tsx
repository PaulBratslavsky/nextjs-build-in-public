import {
  LinkedinIcon,
  TwitterIcon,
  YoutubeIcon,
  GithubIcon,
} from "lucide-react";


function SocialLinks({ linkedin, twitter, youtube, github }: {
  readonly linkedin?: string;
  readonly twitter?: string;
  readonly youtube?: string;
  readonly github?: string;
}) {
  return (
    <ul className="flex flex-nowrap gap-4">
      {linkedin && (
        <li>
          <a
            target="_blank"
            href={linkedin}
            className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200"
            rel="noopener noreferrer"
          >
            <LinkedinIcon />
          </a>
        </li>
      )}
      {twitter && (
        <li>
          <a
            target="_blank"
            href={twitter}
            className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
        </li>
      )}
      {youtube && (
        <li>
          <a
            target="_blank"
            href={youtube}
            className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200"
            rel="noopener noreferrer"
          >
            <YoutubeIcon />
          </a>
        </li>
      )}
      {github && (
        <li>
          <a
            target="_blank"
            href={github}
            className="h-10 w-10 flex items-center justify-center bg-muted rounded-2xl hover:bg-secondary duration-200"
            rel="noopener noreferrer"
          >
            <GithubIcon />
          </a>
        </li>
      )}
    </ul>
  );
}

export default SocialLinks;
