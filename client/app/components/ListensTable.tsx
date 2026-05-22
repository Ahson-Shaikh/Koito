// ListensTable.tsx
import ArtistLinks from "./ArtistLinks";
import Image from "./primitives/Image";
import { type Listen, type NowPlaying } from "api/api";
import { Link } from "react-router";
import { timeSince } from "~/utils/utils";
import { useAppContext } from "~/providers/AppProvider";

interface ListensTableProps {
  listens: Listen[];
  npData?: NowPlaying;
  showNP?: boolean;
  hideArtists?: boolean;
  onDelete: (listen: Listen) => void;
}

export default function ListensTable({
  listens,
  npData,
  showNP,
  hideArtists,
  onDelete,
}: ListensTableProps) {
  const { user } = useAppContext();

  return (
    <table className="table-fixed border-collapse mt-6 w-full">
      <tbody>
        {showNP && npData && (
          <tr className="group border-b border-(--color-bg-tertiary) relative last:border-b-0">
            <td className="py-3 w-8 sm:w-11">
              <Link to={`/track/${npData.track.id}`}>
                <Image
                  src={npData.track.image.small}
                  size={32}
                  alt={npData.track.title}
                />
              </Link>
            </td>
            <td className="max-w-0 w-full px-2">
              <div>
                {!hideArtists && (
                  <>
                    <ArtistLinks artists={npData.track.artists} />
                    {" — "}
                  </>
                )}
                <Link
                  className="hover:text-(--color-fg-secondary)"
                  to={`/track/${npData.track.id}`}
                >
                  {npData.track.title}
                </Link>
              </div>
            </td>
            <td className="text-(--color-fg-tertiary) pr-2 sm:pr-4 text-sm w-[105px]">
              <div className="flex items-center justify-end gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-(--color-primary)" />
                {"Now Playing"}
              </div>
            </td>
          </tr>
        )}
        {listens.map((item) => (
          <tr
            key={`last_listen_${item.time}`}
            className="group border-b border-(--color-bg-tertiary) relative last:border-b-0"
          >
            <td className="py-3 w-8 sm:w-11">
              <Link to={`/track/${item.track.id}`}>
                <Image
                  src={item.track.image.small}
                  size={32}
                  alt={item.track.title}
                />
              </Link>
            </td>
            <td className="max-w-0 w-full px-2">
              <div>
                {!hideArtists && (
                  <>
                    <ArtistLinks artists={item.track.artists} />
                    {" — "}
                  </>
                )}
                <Link
                  className="hover:text-(--color-fg-secondary)"
                  to={`/track/${item.track.id}`}
                >
                  {item.track.title}
                </Link>
              </div>
            </td>
            <td
              className="text-(--color-fg-tertiary) pr-2 sm:pr-4 text-sm text-end whitespace-nowrap w-[100px]"
              title={new Date(item.time).toString()}
            >
              {timeSince(new Date(item.time))}
            </td>
            <td className="hidden sm:table">
              <button
                onClick={() => onDelete(item)}
                className="absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-(--color-fg-tertiary) hover:text-(--color-error)"
                aria-label="Delete"
                hidden={!user}
              >
                ×
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
