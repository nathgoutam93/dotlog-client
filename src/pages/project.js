import React from 'react';
import ProjectEle from '../components/project/index';
import { useParams } from 'react-router';

export default function Project() {
  const { projectId } = useParams();

  return (
    <>
      <ProjectEle projectId={projectId} />
    </>
  );
}
