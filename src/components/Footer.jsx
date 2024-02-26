const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer>
            <a href="https://github.com/JonathanRaposo" target="_blank">
                <div>&copy;{currentYear}  Jonathan Raposo. All rights reserved.</div>
            </a>
        </footer>
    );
}

export default Footer;