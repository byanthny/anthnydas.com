import { getEntriesByProject } from '@/lib/log'
import EntryLink from './EntryLink'

const Items = async () => {
  // Fetch log entries for each project
  const macropadEntries = await getEntriesByProject('macropad-rp2040')

  return (
    <ul className="list-disc">
      <li>info</li>
      <ul>
        <h2>anthony das</h2>
        <ul>
          <li>
            <a href="/resume.pdf">resume</a> &amp;{" "}
            <a href="mailto:me@anthnydas.com">email</a>
          </li>
          <li>
            b.s. in computer science from <a href="https://jhu.edu">jhu</a>
          </li>
        </ul>
        <li>socials</li>
        <ul>
          <li>
            <a href="https://github.com/byanthny/">github</a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/byanthny/">linkedin</a>
          </li>
        </ul>
      </ul>
      <li>
        <a href="https://pinkilo.com">pinkilo</a>:
      </li>
      <ul>
        <li>ambition, digitally crafted.</li>
        <li>
          specializing in software/web consulting & development and IT
          architecture.
        </li>
      </ul>
      <li>
        <a href="https://etp.net">Entertainment Technology Partners</a>:
      </li>
      <ul>
        <li>Web Developer</li>
        <ul>
          <ul>
            <li>
              Web Development, Web Design, AWS, CMS Development, SEO, &
              Analytics
            </li>
          </ul>
          <li>Notable Work:</li>
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
              <a href="https://pixl.live">pixl.live</a>: Next.js, TypeScript,
              TailwindCSS, Vercel, Sanity, Motion/Framer-Motion
            </li>
          </ul>
        </ul>
      </ul>
      <li>projects</li>
      <ul>
        <li>
          <em>current:</em>
        </li>
        <ul>
          <li>
            <a href="https://github.com/byanthny/macropad-rp2040">
              rp2040 macropad
            </a>
            : adafruit rp2040 macropad kit programmed with rust
          </li>
          <ul>
            <li>rust</li>
            {macropadEntries.length > 0 && <li>log:</li>}
            {macropadEntries.length > 0 && (
              <ul>
                {macropadEntries.slice(0, 3).map((entry) => (
                  <EntryLink key={entry.slug} entry={entry} />
                ))}
              </ul>
            )}
          </ul>
        </ul>
        <li>
          <em>my random websites:</em>
        </li>
        <ul>
          <li>
            <a href="https://tonysshrimpshack.com">tonysshrimpshack.com</a>: a
            website to show off my shrimp tank
          </li>
          <li>
            <a href="https://sweettearankings.com">sweettearankings.com</a>: my
            personal sweet tea rankings
          </li>
        </ul>
        <li>
          <em>backlog/maintaining:</em>
        </li>
        <ul>
          <li>
            <a href="https://github.com/byanthny/.dotfiles">.dotfiles</a>: my
            dotfiles
          </li>
          {/* <li>
            <a href="https://github.com/byanthny/opengl">opengl [on hold]</a>:
            learning opengl by making a game engine
          </li>
          <ul>
            <li>c++</li>
          </ul> */}
          {/* <li>
            <a href="https://github.com/byanthny/anthnydas.com">anthnydas</a>:
            tbd
          </li> */}
        </ul>
        <li>
          <em>archive:</em>
        </li>
        <ul>
          <li>
            <a href="https://github.com/byanthny/yugo">yugo</a>: basic hugo
            theme
          </li>
          <ul>
            <li>your go to hugo theme</li>
          </ul>
          <li>
            2022 - <a href="https://gitlab.com/JonoAugustine/on-it">on-it</a>:
            minimal note taking and to-do web application
          </li>
          <ul>
            <li>but overly &apos;complicated&apos; ui</li>
            <li>node, react, sass, typescript, mongoDB</li>
            <li>
              <a href="https://gitlab.com/JonoAugustine/on-it/-/graphs/master">
                members
              </a>
            </li>
          </ul>
          <li>
            2022 - <a href="https://github.com/byanthny/lyric-bot">lyric-bot</a>
            [unfinished]: a discord bot
          </li>
          <ul>
            <li>discord bot for music lyrics</li>
            <li>python</li>
          </ul>
          <li>
            2022 - <a href="https://jhu-bonsai.herokuapp.com/">bonsai</a> [no
            public repo]: resource and collaboration hub for JHU students
          </li>
          <ul>
            <li>class project from uni, repo owned by uni</li>
            <li>node, react, tailwindcss, express, mongoDB, typescript</li>
            <li>members: class group</li>
          </ul>
          <li>
            2021 - <a href="https://github.com/sf11047/anime-db">anime-db</a>:
            an database of anime data and site for analysis
          </li>
          <ul>
            <li>class project from uni</li>
            <li>php, mySQL</li>
            <li>
              <a href="https://github.com/sf11047/anime-db/graphs/contributors">
                members
              </a>
            </li>
          </ul>
          <li>
            2020 - <a href="">drosophila</a> [no public repo]: helped expand
            computational models of Drosophila neuron behavior
          </li>
          <ul>
            <li>research assistant from uni, contributor</li>
            <li>python, NUERON</li>
            <li>members: lab</li>
          </ul>
          <li>
            2020 - <a href="">pintOS</a> [no public repo]: operating system
          </li>
          <ul>
            <li>class project from uni based on pintOS, repo owned by uni</li>
            <li>c, c++</li>
            <li>members: class group</li>
          </ul>
          <li>
            2020 - <a href="">CoGS</a> [no public repo]: android application for
            study groups
          </li>
          <ul>
            <li>class project from uni, repo owned by uni</li>
            <li>android development, java</li>
            <li>members: class group</li>
          </ul>
          <li>
            2019 - <a href="https://github.com/byanthny/Ouch">ouch</a>: a
            simulation where you and your friends can exist in an existence
            together
          </li>
          <ul>
            <li>over complicated messaging rooms</li>
            <li>javascript, less, html</li>
            <li>
              <a href="https://github.com/JonoAugustine">members</a>
            </li>
          </ul>
          <li>
            2019 - <a href="https://github.com/byanthny/Athena">athena</a>{" "}
            [unfinished]: a modern css framework
          </li>
          <ul>
            <li>
              abandoned because better projects exist and learned what i needed
            </li>
            <li>less, html</li>
          </ul>
          <li>
            2018 -{" "}
            <a href="https://www.youtube.com/watch?v=DPesVSQQUqY">
              leadingedge labs &amp; r3d
            </a>
            : game based therapy for custom 3-D printed myoelectric prosthetics
            + project website
          </li>
          <ul>
            <li>built during after school program from high school</li>
            <li>unity, leapmotion, arduino, c++, html/css/js</li>
          </ul>
        </ul>
      </ul>
      <li>site info</li>
      <ul>
        <li>
          <a href="https://github.com/byanthny/byanthny">github repo</a>
        </li>
        <li>
          built with <a href="https://vercel.com/">Next.js & Vercel</a>.
        </li>
      </ul>
    </ul>
  )
}

export default Items
