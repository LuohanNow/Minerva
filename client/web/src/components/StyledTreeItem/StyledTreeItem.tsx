import React from 'react';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import { SvgIconProps, Typography } from '@material-ui/core';
import "./StyledTreeItem.scss"

type StyledTreeItemProps = TreeItemProps & {
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

export function StyledTreeItem(props: StyledTreeItemProps) {
  const {labelText, labelIcon: LabelIcon, labelInfo, ...children } = props;

  return (
    <TreeItem
      label={
        <div className="styled-tree-item">
          <LabelIcon color="inherit" className="label-icon" />
          <Typography variant="body2" className="label-text">
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
    {...children}
  />
  );
}
