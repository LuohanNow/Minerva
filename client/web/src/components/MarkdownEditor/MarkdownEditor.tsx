import React from 'react';
import Vditor from 'vditor';
import "vditor/src/assets/scss/index.scss"

const e = React.createElement

export class MarkdownEditor extends React.Component {
  vditor: any = null;
  componentDidMount () {
      this.vditor = new Vditor('vditor', {
      height: 600,
      lang: 'en_US',
      toolbarConfig: {
        pin: true,
      },
      cache: {
        enable: false,
      },
    })
  }
  render () {
    return e(
      'div', 
      {id: 'vditor'}
    )
  }
}
