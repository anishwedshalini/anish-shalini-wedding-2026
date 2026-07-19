import Reveal from '../components/Reveal'
import { BorderMotif } from '../components/Motifs'
import { familyBlessings } from '../data'
import './Blessings.css'

function FamilyName({ member }) {
  return (
    <li className="family-panel__name">
      {member.prefix && (
        <span className="family-panel__late">{member.prefix}</span>
      )}
      {' '}
      <span>{member.name}</span>
    </li>
  )
}

function FamilyPanel({ family }) {
  return (
    <article className="family-panel">
      <span className="family-panel__corner family-panel__corner--tl" aria-hidden="true" />
      <span className="family-panel__corner family-panel__corner--tr" aria-hidden="true" />
      <span className="family-panel__corner family-panel__corner--bl" aria-hidden="true" />
      <span className="family-panel__corner family-panel__corner--br" aria-hidden="true" />
      <span className="family-panel__cord family-panel__cord--left" aria-hidden="true" />
      <span className="family-panel__cord family-panel__cord--right" aria-hidden="true" />

      <div className="family-panel__arch" aria-hidden="true">
        <span />
      </div>

      <p className="family-panel__side">{family.side}</p>
      <h3 className="family-panel__person">{family.person}</h3>
      <span className="family-panel__flourish" aria-hidden="true" />

      <div className="family-panel__group">
        <p className="family-panel__relationship">
          With the blessings of {family.side.startsWith('Groom') ? 'his' : 'her'} late grandparents
        </p>
        <ul className="family-panel__names">
          {family.grandparents.map((member) => (
            <FamilyName key={`${member.prefix}-${member.name}`} member={member} />
          ))}
        </ul>
      </div>

      <div className="family-panel__group">
        <p className="family-panel__relationship">
          And {family.side.startsWith('Groom') ? 'his' : 'her'} beloved parents
        </p>
        <ul className="family-panel__names">
          {family.parents.map((member) => (
            <FamilyName key={member.name} member={member} />
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Blessings() {
  return (
    <section id="blessings" className="section blessings">
      <div className="section__inner">
        <Reveal>
          <header className="blessings__header">
            <p className="blessings__eyebrow">Blessings of Our Families</p>
            <h2 className="blessings__title" lang="sa">आशीर्वाद</h2>
            <p className="blessings__intro">
              With the blessings of those who came before us,{' '}
              <br />
              and the love of those who walk beside us.
            </p>
            <div className="blessings__divider" aria-hidden="true">
              <span />
              <span className="blessings__om" lang="sa">ॐ</span>
              <span />
            </div>
          </header>
        </Reveal>

        <div className="blessings__grid">
          {familyBlessings.map((family, index) => (
            <Reveal
              key={family.id}
              className="blessings__panel-wrap"
              delay={index * 0.08}
              y={16}
            >
              <FamilyPanel family={family} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="blessings__closing">
            <div className="blessings__closing-ornament" aria-hidden="true">
              <BorderMotif />
            </div>
            <blockquote className="blessings__mantra" lang="sa">
              <span>सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः ।</span>
              <span>सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥</span>
            </blockquote>
            <p className="blessings__meaning">
              “May all be happy, may all be free from illness,{' '}
              <br />
              may all see what is auspicious, and may no one suffer.”
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
