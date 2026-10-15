import Link from 'next/link'
import { getAllEntries, getEntriesByProject } from '@/lib/log'
import EntryLink from './EntryLink'

const Items = async () => {
  const recent = getAllEntries().slice(0, 3)
  const learningEntries = await getEntriesByProject('learning')
  const macropadEntries = await getEntriesByProject('macropad-rp2040')

  return (
    <ul className="list-disc">
      <li>
        anthony das
        <ul>
          {/* draft, edit me: the one line about what you do and where it's going */}
          <li>
            software engineer in orlando. fullstack and architecture by day,
            learning rendering and simulation on the side
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
      <li>
        now
        <ul>
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
        work
        <ul>
          <li>
            <a href="https://pinkilo.com">pinkilo</a>: ambition, digitally
            crafted. software/web consulting & development and IT architecture
          </li>
          <li>
            past: <a href="https://etp.net">Entertainment Technology Partners</a>
            , web developer
            <ul>
              <li>
                web development, web design, aws, cms development, seo, &
                analytics
              </li>
              <li>computer vision, ai & edge devices</li>
              <li>
                notable work:
                <ul>
                  <li>
                    <a href="https://eventeq.com">eventeq.com</a>: Next.js,
                    TypeScript, TailwindCSS, Vercel, Sanity, Motion/Framer-Motion
                  </li>
                  <li>
                    <a href="https://etp.net">etp.net</a>: Next.js, TypeScript,
                    TailwindCSS, Vercel, Sanity, Motion/Framer-Motion
                  </li>
                  <li>
                    <a href="https://pixl.live">pixl.live</a>: Next.js,
                    TypeScript, TailwindCSS, Vercel, Sanity, Motion/Framer-Motion
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        projects
        <ul>
          <li>
            <a href="https://tonysshrimpshack.com">tonysshrimpshack.com</a>: a
            website to show off my shrimp tank
          </li>
          <li>
            <a href="https://sweettearankings.com">sweettearankings.com</a>: my
            personal sweet tea rankings
          </li>
          <li>
            <a href="https://github.com/byanthny/yugo">yugo</a>: a basic dark
            hugo theme, the first version of this site. v1, maintenance mode
          </li>
          <li>
            <a href="https://github.com/byanthny/.dotfiles">.dotfiles</a>: my
            dotfiles
          </li>
          <li>
            <details>
              <summary>older (2018 - 2022)</summary>
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
      {recent.length > 0 && (
        <li>
          <Link href="/log">log</Link>
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
