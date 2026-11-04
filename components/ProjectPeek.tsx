import HoverCard from './HoverCard'
import MacropadArt from './peeks/MacropadArt'
import SiteCard from './peeks/SiteCard'
import StowArt from './peeks/StowArt'

const drawings = {
  stow: StowArt,
  macropad: MacropadArt,
}

type Props =
  // a project with a site shows the site: a screenshot of its homepage in public/projects.
  // site is the address the shot is of, when the link goes elsewhere (yugo: repo vs demo)
  | { label: string; href: string; shot: string; site?: string }
  // one without a site gets a drawing: the macropad, and stow until it launches. no link yet
  // (stow, until its repo is public) puts the card on the word, which gets a dotted underline
  // where the card can show
  | { label: string; href?: string; drawing: keyof typeof drawings }

// a project with a card on hover: the card WorkPreview uses, showing the project's site, or a
// drawing of it when it has none
const ProjectPeek = (props: Props) => {
  const { label, href } = props
  const trigger = href ? (
    <a href={href}>{label}</a>
  ) : (
    <span className="lg:[@media(hover:hover)]:underline lg:[@media(hover:hover)]:decoration-neutral-500 lg:[@media(hover:hover)]:decoration-dotted lg:[@media(hover:hover)]:underline-offset-4">
      {label}
    </span>
  )
  const Drawing = 'drawing' in props ? drawings[props.drawing] : null

  return (
    <HoverCard trigger={trigger}>
      {'shot' in props ? (
        <SiteCard href={props.site ?? props.href} shot={props.shot} />
      ) : (
        Drawing && <Drawing />
      )}
    </HoverCard>
  )
}

export default ProjectPeek
