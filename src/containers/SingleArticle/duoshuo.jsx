import React from 'react'
const DuoShuo=React.createClass({
  propTypes: {
    thread: React.PropTypes.string,
    title: React.PropTypes.string,
    url: React.PropTypes.string,
    shortName: React.PropTypes.string,
    id: React.PropTypes.string
  },
  render () {
    return(
      <div className="ds-thread" data-thread-key= {this.props.thread} data-title= {this.props.title} data-url={this.props.url}>
      </div>
    )
  },
  componentDidMount () {
    const currentGlobal=(window||global)
    currentGlobal.duoshuoQuery={ short_name: this.props.shortName }
    const script=`
        (function() {
          var ds = document.createElement('script');
          ds.type = 'text/javascript';ds.async = true;
          ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
          ds.charset = 'UTF-8';
          (document.getElementsByTagName('head')[0]
           || document.getElementsByTagName('body')[0]).appendChild(ds);
        })();
    `
    eval(script)
  }
})
export default DuoShuo
