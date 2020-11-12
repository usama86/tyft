import ImageResizer from 'react-native-image-resizer';

export const ImageResize = async(path,maxWidth,maxHeight,compressFormat,quality) => {
    ImageResizer.createResizedImage(path, maxWidth, maxHeight, compressFormat, quality)
      .then(async(response) => {
        let getResponse = await response;
        return getResponse;
        // response.uri is the URI of the new image that can now be displayed, uploaded...
        // response.path is the path of the new image
        // response.name is the name of the new image with the extension
        // response.size is the size of the new image
      })
      .catch(err => {
          return err;
        // Oops, something went wrong. Check that the filename is correct and
        // inspect err to get more details.
      });
}


//default props are:  path, maxWidth, maxHeight, compressFormat, quality, rotation = 0, outputPath

//val.uri, 80, 60, 'JPEG', 100