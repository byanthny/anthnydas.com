import type { CSSProperties } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getAllEntries, getEntriesByProject } from '@/lib/log'
import EntryLink from './EntryLink'
import Mortarboard from './Mortarboard'
import ProjectPeek from './ProjectPeek'
import ShortLink from './ShortLink'
import WorkPreview from './WorkPreview'

// a project's own icon as its bullet (.icon-bullet in globals.css). only marks i own
const icon = (src: string) => ({ '--icon': `url(${src})` }) as CSSProperties

// 88x31 buttons for my sites, old-web style. the first one is for anyone linking here
const buttons = [
  { src: '/buttons/anthnydas.svg', href: '/', alt: 'anthnydas.com' },
  { src: '/buttons/learning.svg', href: 'https://learning.anthnydas.com', alt: 'learning.anthnydas.com' },
  { src: '/buttons/shrimpshack.svg', href: 'https://www.tonysshrimpshack.com', alt: "tony's shrimp shack" },
  { src: '/buttons/yugo.svg', href: 'https://yugo-theme.vercel.app', alt: 'yugo, a hugo theme' },
]

const Items = async () => {
  const recent = getAllEntries().slice(0, 3)
  const learningEntries = await getEntriesByProject('learning')
  const macropadEntries = await getEntriesByProject('macropad-rp2040')

  // "last updated": the day this build ran (utc, so no time zone shows) and its commit
  const updated = new Date()
    .toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    .toLowerCase()
  const commit = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 7)

  return (
    <ul className="list-disc site-list">
      <li id="about" className="scroll-mt-24">
        <strong className="heading">anthony das</strong>
        <ul>
          <li>
            software engineer. fullstack and architecture by day, learning
            rendering and simulation on the side
          </li>
          <li>
            b.s. in computer science from{" "}
            <span className="jhu">
              <ShortLink href="https://jhu.edu">jhu</ShortLink>
              <Mortarboard />
            </span>
          </li>
          <li>
            <ShortLink href="/resume.pdf">resume</ShortLink> &middot;{" "}
            <ShortLink href="mailto:me@anthnydas.com">email</ShortLink> &middot;{" "}
            <ShortLink href="https://github.com/byanthny/">github</ShortLink> &middot;{" "}
            <ShortLink href="https://www.linkedin.com/in/byanthny/">linkedin</ShortLink>
          </li>
        </ul>
      </li>
      <li id="projects" className="scroll-mt-24">
        <span className="heading underline underline-offset-4">projects</span>
        <ul>
          <li>
            <em>now:</em>
            <ul>
              <li>
                {/* link it once the stow repo is public (add href to the peek) */}
                <ProjectPeek label="stow" drawing="stow" /> [soon]: a small native
                macos board for markdown notes and github pull requests
                <ul>
                  <li>swift, appkit, swiftui</li>
                </ul>
              </li>
              <li className="icon-bullet" style={icon('/icons/learning.svg')}>
                <ProjectPeek
                  href="https://learning.anthnydas.com"
                  label="learning.anthnydas.com"
                  shot="/projects/learning.jpg"
                />
                : visual notes on algorithms, graphics, and the tools i use
                <ul>
                  <li>astro, react, gsap</li>
                  {learningEntries.length > 0 && (
                    <li>
                      log:
                      <ul>
                        {learningEntries.slice(0, 3).map((entry) => (
                          <EntryLink key={entry.slug} entry={entry} />
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </li>
              <li>
                <ProjectPeek
                  href="https://github.com/byanthny/macropad-rp2040"
                  label="rp2040 macropad"
                  drawing="macropad"
                />
                : adafruit rp2040 macropad kit programmed with rust
                <ul>
                  <li>rust</li>
                  {macropadEntries.length > 0 && (
                    <li>
                      log:
                      <ul>
                        {macropadEntries.slice(0, 3).map((entry) => (
                          <EntryLink key={entry.slug} entry={entry} />
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <em>my random websites:</em>
            <ul>
              <li>
                <ProjectPeek
                  href="https://www.tonysshrimpshack.com"
                  label="tonysshrimpshack.com"
                  shot="/projects/shrimpshack.jpg"
                />
                : a website to show off my shrimp tank
              </li>
            </ul>
          </li>
          <li>
            <em>maintaining:</em>
            <ul>
              <li>
                <ProjectPeek
                  href="https://github.com/byanthny/yugo"
                  label="yugo"
                  shot="/projects/yugo.jpg"
                  site="https://yugo-theme.vercel.app"
                />
                : basic hugo theme
                <ul>
                  <li>your go to hugo theme</li>
                  <li>
                    v1.0.2, maintenance mode &middot;{" "}
                    <ShortLink href="https://yugo-theme.vercel.app">demo</ShortLink>
                  </li>
                </ul>
              </li>
              <li>
                <ShortLink href="https://github.com/byanthny/.dotfiles">.dotfiles</ShortLink>:
                my dotfiles
              </li>
            </ul>
          </li>
          <li>
            <details>
              <summary>
                <em>older (2018 - 2022)</em>
              </summary>
              <ul>
                <li>
                  2022 -{" "}
                  <ShortLink href="https://gitlab.com/JonoAugustine/on-it">on-it</ShortLink>:
                  minimal note taking and to-do web application
                  <ul>
                    <li>but overly &apos;complicated&apos; ui</li>
                    <li>node, react, sass, typescript, mongoDB</li>
                    <li>
                      <ShortLink href="https://gitlab.com/JonoAugustine/on-it/-/graphs/master">
                        members
                      </ShortLink>
                    </li>
                  </ul>
                </li>
                <li>
                  2022 - lyric-bot [unfinished]: a discord bot
                  <ul>
                    <li>discord bot for music lyrics</li>
                    <li>python</li>
                  </ul>
                </li>
                <li>
                  2022 - bonsai [no public repo]: resource and collaboration hub
                  for JHU students
                  <ul>
                    <li>class project from uni, repo owned by uni</li>
                    <li>node, react, tailwindcss, express, mongoDB, typescript</li>
                    <li>members: class group</li>
                  </ul>
                </li>
                <li>
                  2021 -{" "}
                  <ShortLink href="https://github.com/sf11047/anime-db">anime-db</ShortLink>: an
                  database of anime data and site for analysis
                  <ul>
                    <li>class project from uni</li>
                    <li>php, mySQL</li>
                    <li>
                      <ShortLink href="https://github.com/sf11047/anime-db/graphs/contributors">
                        members
                      </ShortLink>
                    </li>
                  </ul>
                </li>
                <li>
                  2020 - drosophila [no public repo]: helped expand
                  computational models of Drosophila neuron behavior
                  <ul>
                    <li>research assistant from uni, contributor</li>
                    <li>python, NUERON</li>
                    <li>members: lab</li>
                  </ul>
                </li>
                <li>
                  2020 - pintOS [no public repo]: operating system
                  <ul>
                    <li>
                      class project from uni based on pintOS, repo owned by uni
                    </li>
                    <li>c, c++</li>
                    <li>members: class group</li>
                  </ul>
                </li>
                <li>
                  2020 - CoGS [no public repo]: android application for study
                  groups
                  <ul>
                    <li>class project from uni, repo owned by uni</li>
                    <li>android development, java</li>
                    <li>members: class group</li>
                  </ul>
                </li>
                <li>
                  2019 - <ShortLink href="https://github.com/byanthny/Ouch">ouch</ShortLink>: a
                  simulation where you and your friends can exist in an existence
                  together
                  <ul>
                    <li>over complicated messaging rooms</li>
                    <li>javascript, less, html</li>
                    <li>
                      <ShortLink href="https://github.com/JonoAugustine">members</ShortLink>
                    </li>
                  </ul>
                </li>
                <li>
                  2019 - <ShortLink href="https://github.com/byanthny/Athena">athena</ShortLink>{" "}
                  [unfinished]: a modern css framework
                  <ul>
                    <li>
                      abandoned because better projects exist and learned what i
                      needed
                    </li>
                    <li>less, html</li>
                  </ul>
                </li>
                <li>
                  2018 -{" "}
                  <ShortLink href="https://www.youtube.com/watch?v=DPesVSQQUqY">
                    leadingedge labs &amp; r3d
                  </ShortLink>
                  : game based therapy for custom 3-D printed myoelectric
                  prosthetics + project website
                  <ul>
                    <li>built during after school program from high school</li>
                    <li>unity, leapmotion, arduino, c++, html/css/js</li>
                  </ul>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </li>
      <li id="work" className="scroll-mt-24">
        <span className="heading underline underline-offset-4">work</span>
        <ul>
          <li>
            <em>current:</em>
            <ul>
              <li className="icon-bullet" style={icon('/icons/pinkilo.png')}>
                <ShortLink href="https://pinkilo.com">pinkilo</ShortLink>:
                <ul>
                  <li>ambition, digitally crafted.</li>
                  <li>
                    specializing in software/web consulting & development and
                    IT architecture.
                  </li>
                  <li className="icon-bullet" style={icon('/icons/aquaridex.png')}>
                    <ShortLink href="https://www.aquaridex.com">aquaridex</ShortLink>: explore
                    and manage aquatic animal collections, with species
                    profiles, care guides and water parameters
                  </li>
                  <li className="icon-bullet" style={icon('/icons/masteryaquaria.svg')}>
                    <ShortLink href="https://www.masteryaquaria.com">mastery aquaria</ShortLink>
                    : field-grown botanicals, shrimp-safe goods and a species
                    reference
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <em>past:</em>
            <ul>
              <li>
                <ShortLink href="https://etp.net">Entertainment Technology Partners</ShortLink>
                : web developer
                <ul>
                  <li>
                    web development, web design, aws, cms development, seo, &
                    analytics
                  </li>
                  <li>
                    computer vision, ai & edge devices
                    <ul>
                      <li>
                        <ShortLink href="https://www.knw.net">knw.net</ShortLink>: audience
                        intelligence for live events. the dashboard is still
                        mostly my work; the public site isn&apos;t my design
                        anymore
                      </li>
                    </ul>
                  </li>
                  <li>
                    notable work{" "}
                    <span className="text-neutral-400">
                      (the live sites have changed since my work there
                      <span className="hidden lg:[@media(hover:hover)]:inline">
                        ; hover a link to see them as i shipped them
                      </span>
                      )
                    </span>
                    :
                    <ul>
                      <li>
                        <WorkPreview href="https://eventeq.com" label="eventeq.com" site="eventeq" shots={['home', 'work', 'led']} />
                        : Next.js, TypeScript, TailwindCSS, Vercel, Sanity,
                        Motion/Framer-Motion
                      </li>
                      <li>
                        <WorkPreview href="https://etp.net" label="etp.net" site="etp" shots={['home', 'about', 'careers']} />
                        : Next.js, TypeScript, TailwindCSS, Vercel, Sanity,
                        Motion/Framer-Motion
                      </li>
                      <li>
                        <WorkPreview href="https://pixl.live" label="pixl.live" site="pixl" shots={['home', 'av-hire', 'portfolio']} />
                        : Next.js, TypeScript, TailwindCSS, Vercel, Sanity,
                        Motion/Framer-Motion
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      {recent.length > 0 && (
        <li id="log" className="scroll-mt-24">
          <Link href="/log" className="heading underline underline-offset-4">
            log
          </Link>
          <ul>
            {recent.map((entry) => (
              <EntryLink key={entry.slug} entry={entry} />
            ))}
          </ul>
        </li>
      )}
      <li>
        site info
        <ul>
          <li>
            <ShortLink href="https://github.com/byanthny/anthnydas.com">github repo</ShortLink>
          </li>
          <li>
            built with <ShortLink href="https://vercel.com/">Next.js & Vercel</ShortLink>.
          </li>
          <li>
            88&times;31s for my sites (hotlink mine if you want):
            <span className="flex flex-wrap gap-2 pb-1 pt-2">
              {buttons.map((button) => (
                <a key={button.src} href={button.href} className="plain">
                  <Image src={button.src} alt={button.alt} width={88} height={31} unoptimized />
                </a>
              ))}
            </span>
          </li>
          <li className="text-neutral-400">
            last updated {updated}
            {commit && (
              <>
                {" "}&middot;{" "}
                <ShortLink href={`https://github.com/byanthny/anthnydas.com/commit/${commit}`}>{commit}</ShortLink>
              </>
            )}
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default Items
