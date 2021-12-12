import React from 'react';

import Header from './header';
import Timeline from './timeline';
import * as Fake from '../../seed';

export default function ProjectEle({ projectId }) {
  const project = Fake.Projects.find((project) => {
    return project.projectId === projectId;
  });

  return (
    <div className="w-full">
      {project && (
        <Header
          name={project.projectName}
          imgSrc={project.imgSrc}
          about={project.about}
          followers={project.followers.length}
        />
      )}

      <Timeline posts={project.posts} />
    </div>
  );
}
