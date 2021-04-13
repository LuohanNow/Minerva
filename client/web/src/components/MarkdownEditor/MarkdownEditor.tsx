import React from 'react';
import Vditor from 'vditor';
import "vditor/src/assets/scss/index.scss"

const e = React.createElement

export class MarkdownEditor extends React.Component {
  vditor: any = null;
  componentDidMount () {
      this.vditor = new Vditor('vditor', {
      height: 800,
      lang: 'en_US',
      icon: 'material',
      outline: { enable: true, position: "left"},
      toolbarConfig: {
        pin: true
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
