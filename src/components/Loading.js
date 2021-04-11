import { experimentalStyled } from '@material-ui/core';

const LoadingContainer = experimentalStyled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
});

const Loading = (props) => (
  <LoadingContainer>
    <img
      alt="Loading"
      src="/static/images/loading.svg"
      {...props}
    />
  </LoadingContainer>
);

export default Loading;
