import React from 'react'
import PropTypes from 'prop-types'
import config from '../../config'
import cl from 'classnames'
import { Link } from 'react-router-dom'
import idea from './single-idea.scss'
import button from 'styles/_button.scss'
import icon from 'styles/_icon.scss'
import overlay from '../overlay/overlay.scss'
import Section from '../idea-section/idea-section'
import { getDateMessageAlert, getFormattedDate } from '../../lib/utils'


class SingleIdea extends React.Component {
  constructor() {
    super();

    this.closeOnClick = function(e) {
      if (e.keyCode !== 27) return

      this.props.history.push(config.routes.list)
    }.bind(this);
  }

  componentDidMount() {
    document.body.addEventListener('keyup', this.closeOnClick)
  }

  componentWillUnmount() {
    document.body.removeEventListener('keyup', this.closeOnClick)
  }

  render() {
    const {
      title,
      timestamp,
      content,
      sections,
      id,
      updateIdeaSections,
      coverImage,
      deadline,
      isCompleted,
      toggleCompactIdeaView,
      ideaCompactView,
    } = this.props

    const updateSection = (sectionIndex) => {
      sections[sectionIndex].isCompleted = !sections[sectionIndex].isCompleted
      updateIdeaSections(sections)
    }

    const showDeadlineAlert = () => {
      if (!deadline || isCompleted) return ''

      const message = getDateMessageAlert(deadline)

      if (message) {
        return (
          <div className={cl(
            idea.expirationMessage,
            idea[message.code]
          )}>
            {message.message}
          </div>
        )
      }
    }

    return (
      <div className={cl(idea.idea, {
        [idea.withBg]: coverImage
      })}>
        {coverImage && (
          <div className={idea.coverImageContainer} style={{ backgroundImage: `url(${coverImage}` }}>
          </div>
        )}

        <div className={idea.titleContainer}>
          <h2 className={idea.title}>{title}</h2>
        </div>

        <div className={idea.date}>
          <time>
            <svg className={icon.icon}>
              <use xlinkHref="#calendar"/>
            </svg>
            Created: {getFormattedDate(timestamp)}
          </time>

          {deadline &&
          <time className={idea.deadline}>
            <svg className={icon.icon}>
              <use xlinkHref="#flag"/>
            </svg>
            Deadline: {getFormattedDate(deadline)}
          </time>
          }
        </div>
        {showDeadlineAlert()}

        {idea.content && (
          <div className={idea.content}>
            {content.split('\n').map((subcontent, index) => {
              if (!subcontent) return
              return <p key={index}>{subcontent}</p>
            })}
          </div>
        )}


        <nav onClick={() => toggleCompactIdeaView()}>
          <button className={button.vanilla}>Toggle compact view</button>
        </nav>

        <ul className={idea.sections}>
          {sections && sections.map((section, index) => (
            <Section key={index}
                     {...section}
                     index={index}
                     ideaCompactView={ideaCompactView}
                     updateSection={updateSection}/>
          ))}
        </ul>

        <nav className={overlay.nav}>
          <Link
            className={button.button}
            to={config.routes.editIdea(id)}>Edit</Link>

          <Link
            className={button.button}
            to={config.routes.list}>Close</Link>
        </nav>
      </div>
    )
  }
}


SingleIdea.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  sections: PropTypes.array,
}

export default SingleIdea