import Link from 'next/link'
import { getAllEntries, getEntriesByProject } from '@/lib/log'
import EntryLink from './EntryLink'
import WorkPreview from './WorkPreview'

const Items = async () => {
  const recent = getAllEntries().slice(0, 3)
  const learningEntries = await getEntriesByProject('learning')
  const macropadEntries = await getEntriesByProject('macropad-rp2040')

  return (
    <ul className="list-disc">
      <li id="about" className="scroll-mt-24">
        <strong className="heading">anthony das</strong>
        <ul>
          {/* TODO(tony): the one line about what you do and where it's going,
              in your words. the 10/15 draft named your city; it stays off */}
          <li>
            software engineer. fullstack and architecture by day, learning
            rendering and simulation on the side
          </li>
          <li>
            b.s. in computer science from <a href="https://jhu.edu">jhu</a>
          </li>
          <li>
            <a href="/resume.pdf">resume</a> &middot;{" "}
            <a href="mailto:me@anthnydas.com">email</a> &middot;{" "}
            <a href="https://github.com/byanthny/">github</a> &middot;{" "}
            <a href="https://www.linkedin.com/in/byanthny/">linkedin</a>
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
                {/* TODO(tony): stow in your words. no link until the repo is public */}
                stow [soon]: a small native macos board for markdown notes and
                github pull requests
                <ul>
                  <li>swift, appkit, swiftui</li>
                </ul>
              </li>
              <li>
                <a href="https://learning.anthnydas.com">learning.anthnydas.com</a>
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
                <a href="https://github.com/byanthny/macropad-rp2040">
                  rp2040 macropad
                </a>
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
                <a href="https://www.tonysshrimpshack.com">tonysshrimpshack.com</a>
                : a website to show off my shrimp tank
              </li>
            </ul>
          </li>
          <li>
            <em>maintaining:</em>
            <ul>
              <li>
                <a href="https://github.com/byanthny/yugo">yugo</a>: basic hugo
                theme
                <ul>
                  <li>your go to hugo theme</li>
                  <li>
                    v1.0.2, maintenance mode &middot;{" "}
                    <a href="https://yugo-theme.vercel.app">demo</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="https://github.com/byanthny/.dotfiles">.dotfiles</a>:
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
                  <a href="https://gitlab.com/JonoAugustine/on-it">on-it</a>:
                  minimal note taking and to-do web application
                  <ul>
                    <li>but overly &apos;complicated&apos; ui</li>
                    <li>node, react, sass, typescript, mongoDB</li>
                    <li>
                      <a href="https://gitlab.com/JonoAugustine/on-it/-/graphs/master">
                        members
                      </a>
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
                  <a href="https://github.com/sf11047/anime-db">anime-db</a>: an
                  database of anime data and site for analysis
                  <ul>
                    <li>class project from uni</li>
                    <li>php, mySQL</li>
                    <li>
                      <a href="https://github.com/sf11047/anime-db/graphs/contributors">
                        members
                      </a>
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
                  2019 - <a href="https://github.com/byanthny/Ouch">ouch</a>: a
                  simulation where you and your friends can exist in an existence
                  together
                  <ul>
                    <li>over complicated messaging rooms</li>
                    <li>javascript, less, html</li>
                    <li>
                      <a href="https://github.com/JonoAugustine">members</a>
                    </li>
                  </ul>
                </li>
                <li>
                  2019 - <a href="https://github.com/byanthny/Athena">athena</a>{" "}
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
                  <a href="https://www.youtube.com/watch?v=DPesVSQQUqY">
                    leadingedge labs &amp; r3d
                  </a>
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
              <li>
                <a href="https://pinkilo.com">pinkilo</a>:
                <ul>
                  <li>ambition, digitally crafted.</li>
                  <li>
                    specializing in software/web consulting & development and
                    IT architecture.
                  </li>
                  <li>
                    <a href="https://www.aquaridex.com">aquaridex</a>: explore
                    and manage aquatic animal collections, with species
                    profiles, care guides and water parameters
                  </li>
                  <li>
                    <a href="https://www.masteryaquaria.com">mastery aquaria</a>
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
                <a href="https://etp.net">Entertainment Technology Partners</a>
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
                        <a href="https://www.knw.net">knw.net</a>: audience
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
            <a href="https://github.com/byanthny/anthnydas.com">github repo</a>
          </li>
          <li>
            built with <a href="https://vercel.com/">Next.js & Vercel</a>.
          </li>
        </ul>
      </li>
    </ul>
  )
}

export default Items
