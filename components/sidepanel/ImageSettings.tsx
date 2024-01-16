import React, { Fragment } from 'react';
import styled from 'styled-components';
import { ElementState } from '@creatomate/preview';
import { ImagePreset } from './ImagePreset';
import { PropertyCaption } from './PropertyCaption';
import { PropertySelect } from './PropertySelect';
import { AnimationSettings } from './AnimationSettings';

interface ImageSettingsProps {
  activeElement: ElementState;
}

const defaultImages = [
  "https://unai-organization-dev.s3.amazonaws.com/svr/jeff.png",
  "https://unai-organization-dev.s3.amazonaws.com/svr/ryan.png"
]

async function checkImage(url: string) {
  const res = await fetch(url);
  const buff = await res.blob();

  return buff.type.startsWith('image/')
}

export const ImageSettings: React.FC<ImageSettingsProps> = (props) => {
  const [images, setImages] = React.useState(defaultImages)
  const handleNewFile = async (event: any) => {
    event.preventDefault();
    const newImageUrl = event.target['file-input-creatomate'].value;

    const isValidImage = await checkImage(newImageUrl);
    if (!isValidImage) {
      // Error Handling...
      return;
    }

    setImages([...images, newImageUrl]);
    event.target.reset();
  }
  return (
    <Fragment>
      {images.map((imageUrl) => <ImagePreset
        key={imageUrl}
        activeElement={props.activeElement}
        url={imageUrl}
      />)}

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

      <PropertyCaption>Overlay</PropertyCaption>
      <PropertySelect
        activeElement={props.activeElement}
        propertyName="color_overlay"
        defaultValue=""
        options={[
          { caption: 'None', value: '' },
          { caption: '20%', value: 'rgba(0,0,0,0.2)' },
          { caption: '40%', value: 'rgba(0,0,0,0.4)' },
          { caption: '60%', value: 'rgba(0,0,0,0.6)' },
          { caption: '80%', value: 'rgba(0,0,0,0.8)' },
        ]}
      />

      <AnimationSettings activeElement={props.activeElement} />

      <Information>
        To keep this demo to a minimum, only a few image properties are shown. See all capabilities in the{' '}
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
