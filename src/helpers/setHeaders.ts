export default (): void => {
  const myheaders = new Headers();
  myheaders.append('X-Content-Type-Options', 'nosniff');
  myheaders.append('X-Frame-Options', 'DENY');
  myheaders.append('Content-Security-Policy', 'frame-ancestors');
};
