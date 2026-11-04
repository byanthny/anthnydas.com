import HoverCard from './HoverCard'
import LearningArt from './peeks/LearningArt'
import MacropadArt from './peeks/MacropadArt'
import ShrimpArt from './peeks/ShrimpArt'
import StowArt from './peeks/StowArt'
import YugoArt from './peeks/YugoArt'

const arts = {
  stow: StowArt,
  learning: LearningArt,
  macropad: MacropadArt,
  shrimp: ShrimpArt,
  yugo: YugoArt,
}

type Props = {
  label: string
  // no link yet (stow, until its repo is public): the card hangs off the word, which gets a
  // dotted underline where the card can show
  href?: string
  art: keyof typeof arts
}

// a project with a small drawn loop on hover: the card WorkPreview uses, with a moment from
// the project instead of screenshots. the loop only runs while the card is open
const ProjectPeek = ({ label, href, art }: Props) => {
  const Art = arts[art]
  const trigger = href ? (
    <a href={href}>{label}</a>
  ) : (
    <span className="lg:[@media(hover:hover)]:underline lg:[@media(hover:hover)]:decoration-neutral-500 lg:[@media(hover:hover)]:decoration-dotted lg:[@media(hover:hover)]:underline-offset-4">
      {label}
    </span>
  )

  return (
    <HoverCard trigger={trigger}>
      <Art />
    </HoverCard>
  )
}

export default ProjectPeek
