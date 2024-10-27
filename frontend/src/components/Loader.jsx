import { Spinner } from 'react-bootstrap';

const Loader = () => {
    return (
        <Spinner animation="border" role="status" style={{ height: '100px', width: '100px', margin: 'auto', display: 'block' }} />
    )
}

export default Loader;