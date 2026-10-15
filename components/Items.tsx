import { getEntriesByProject } from '@/lib/log'
import EntryLink from './EntryLink'

const Items = async () => {
  // Fetch log entries for each project
  const learningEntries = await getEntriesByProject('learning')
  const macropadEntries = await getEntriesByProject('macropad-rp2040')

  return (
    <ul className="list-disc">
      <li>
        info
        <ul>
          <li className="list-none">
            <h2>anthony das</h2>
            <ul>
              <li>
                <a href="/resume.pdf">resume</a> &amp;{" "}
                <a href="mailto:me@anthnydas.com">email</a>
              </li>
              <li>
                b.s. in computer science from <a href="https://jhu.edu">jhu</a>
              </li>
              <li>
                focusing on building ambitious products
                <ul>
                  <li>software architecture & fullstack engineering</li>
                  <li>machine learning & computer vision</li>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            socials
            <ul>
              <li>
                <a href="https://github.com/byanthny/">github</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/byanthny/">linkedin</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <a href="https://pinkilo.com">pinkilo</a>:
        <ul>
          <li>ambition, digitally crafted.</li>
          <li>
            specializing in software/web consulting & development and IT
            architecture.
          </li>
        </ul>
      </li>
      <li>
        <em>past:</em>
        <ul>
          <li>
            <a href="https://etp.net">Entertainment Technology Partners</a>:
            <ul>
              <li>
                Web Developer
                <ul>
                  <li className="list-none">
                    <ul>
                      <li>
                        Web Development, Web Design, AWS, CMS Development, SEO,
                        & Analytics
                      </li>
                      <li>Computer Vision, AI & Edge Devices</li>
                    </ul>
                  </li>
                  <li>
                    Notable Work:
                    <ul>
                      <li>
                        <a href="https://eventeq.com">eventeq.com</a>: Next.js,
                        TypeScript, TailwindCSS, Vercel, Sanity,
                        Motion/Framer-Motion
                      </li>
                      <li>
                        <a href="https://etp.net">etp.net</a>: Next.js,
                        TypeScript, TailwindCSS, Vercel, Sanity,
                        Motion/Framer-Motion
                      </li>
                      <li>
                        <a href="https://pixl.live">pixl.live</a>: Next.js,
                        TypeScript, TailwindCSS, Vercel, Sanity,
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
      <li>
        projects
        <ul>
          <li>
            <em>current:</em>
            <ul>
              <li>
                <a href="https://learning.anthnydas.com">
                  learning.anthnydas.com
                </a>
                : visual notes on algorithms, graphics, and the tools i use.
                every page is also plain markdown, and there&apos;s an mcp for
                your ai
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
                <a href="https://tonysshrimpshack.com">tonysshrimpshack.com</a>:
                a website to show off my shrimp tank
              </li>
              <li>
                <a href="https://sweettearankings.com">sweettearankings.com</a>:
                my personal sweet tea rankings
              </li>
            </ul>
          </li>
          <li>
            <em>backlog/maintaining:</em>
            <ul>
              <li>
                <a href="https://github.com/byanthny/.dotfiles">.dotfiles</a>:
                my dotfiles
              </li>
            </ul>
          </li>
          <li>
            <em>archive:</em>
            <ul>
              <li>
                <a href="https://github.com/byanthny/yugo">yugo</a>: basic hugo
                theme
                <ul>
                  <li>your go to hugo theme</li>
                </ul>
              </li>
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
          </li>
        </ul>
      </li>
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
