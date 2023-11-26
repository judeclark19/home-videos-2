import { Video } from '@/pages'
import React from 'react'
import { IFrame, Loading, VideoEl, VideoInfo } from './VideoCard.styles'



function VideoCard({ video }: { video: Video }) {

  console.log(video)
  return <VideoEl>

    <Loading>Loading video...

      <IFrame
        className="video-iframe"
        src={video.url}
        frameBorder="0"
        width="560"
        height="315"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      ></IFrame>
    </Loading>

    <VideoInfo>
      <h3>{video.title}</h3>
    </VideoInfo>

  </VideoEl>
  // return (
  //   <div className="videoEl">
  //     <div className="loading">
  //       Loading video...
  //       <iframe
  //         className="video-iframe"
  //         src=""
  //         frameBorder="0"
  //         width="560"
  //         height="315"
  //         allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  //         allowFullScreen
  //         loading="lazy"
  //       ></iframe>
  //     </div>
  //     <div className="video-info">
  //       <h3 className="video-title">{title}</h3>
  //       <p className="video-date"></p>
  //       <p className="video-duration"></p>
  //       <p className="video-beginning"></p>
  //       <p className="video-description"></p>
  //       <p className="video-location"></p>
  //       <p className="video-tags"></p>
  //       <p className="video-people"></p>
  //       <p className="video-notes"></p>
  //     </div>
  //     <div style="padding: 20px; text-align: center">
  //       <p><em>Have comments or corrections for this video?</em></p>
  //       <button className="send-message">Send message about this video</button>
  //     </div>
  //   </div>
  // )
}

export default VideoCard