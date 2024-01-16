import React, { Fragment } from 'react';
import styled from 'styled-components';
import { ElementState } from '@creatomate/preview';
import { VideoPreset } from './VideoPreset';
import { PropertyCaption } from './PropertyCaption';
import { PropertySelect } from './PropertySelect';
import { AnimationSettings } from './AnimationSettings';

interface VideoSettingsProps {
  activeElement: ElementState;
}

const defaultVideos = [
  "https://unai-organization-dev.s3.amazonaws.com/svr/Jeff.mp4",
  "https://unai-organization-dev.s3.amazonaws.com/svr/Ryan.mp4"
];

async function checkVideo(url: string) {
  const res = await fetch(url);
  const buff = await res.blob();

  return buff.type.startsWith('video/')
}

export const VideoSettings: React.FC<VideoSettingsProps> = (props) => {
  const [videos, setVideos] = React.useState(defaultVideos)

  const handleNewFile = async (event: any) => {
    event.preventDefault();
    const newVideoUrl = event.target['file-input-creatomate'].value;

    const isValidVideo = await checkVideo(newVideoUrl);
    if (!isValidVideo) {
      console.log("InvalidURL");
      // Error Handling...
      return;
    }

    setVideos([...videos, newVideoUrl]);
    event.target.reset();
  }

  return (
    <Fragment>
      {videos.map(videoUrl => (<VideoPreset
        key={videoUrl}
        activeElement={props.activeElement}
        url={videoUrl}
      />))}

      <form onSubmit={handleNewFile}>
        {/* <label htmlFor="file-input-creatomate">Add File</label> */}
        <input id="file-input-creatomate" required />
        <button type="submit"> Add File</button>
      </form>


      <PropertyCaption>Fit</PropertyCaption>
      <PropertySelect
        activeElement={props.activeElement}
        propertyName="fit"
        defaultValue="cover"
        options={[
          { caption: 'Cover', value: 'cover' },
          { caption: 'Contain', value: 'contain' },
          { caption: 'Fill', value: 'fill' },
        ]}
      />

      <AnimationSettings activeElement={props.activeElement} />

      <Information>
        To keep this demo to a minimum, only a few video properties are shown. See all capabilities in the{' '}
        <a href="https://creatomate.com/docs/api/introduction" target="_blank" rel="noreferrer">
          API documentation
        </a>{' '}
        and the Creatomate{' '}
        <a href="https://creatomate.com/docs/template-editor/image" target="_blank" rel="noreferrer">
          template editor
        </a>
        .
      </Information>
    </Fragment>
  );
};

const Information = styled.div`
  margin-top: 20px;
  color: #a3a5a5;

  a {
    color: #a3a5a5;
  }
`;
