import { ReportHandler } from 'web-vitals';


const reportWebVitals:Function = (onPerfEntry?: ReportHandler | undefined) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry) // cumulative layout shift 광고나 콘텐츠 위치 등 사용자가 불편한지에 대한 성능을 체크
      getFID(onPerfEntry) // first input delay 웹페이지의 반응성에 대한 지표 이벤트가 시작했을 때 걸리는 시간을 체크
      getFCP(onPerfEntry) // first contentful paint 브라우저가 화면에 그려지기 시작한 시점을 체크
      getLCP(onPerfEntry) // largest contentful paint 웹페이지에서 커다란 컴포넌트를 표시하는데 걸리는 시간을 체크
      getTTFB(onPerfEntry) //time to first byte 웹페이지에서 가장 첫 번째 바이트를 가지고 오는 데까지 걸리는 시간을 체크
    })
  }
}

export default reportWebVitals
