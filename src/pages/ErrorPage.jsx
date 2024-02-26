const ErrorPage = () => {

    const divStyles = {
        textAlign: 'center',
        fontSize: '70px'
    }
    return (
        <div className="Error" style={divStyles}>
            <p>Page not found.</p>
        </div>
    );
}
export default ErrorPage;