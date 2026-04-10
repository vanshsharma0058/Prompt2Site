import {Link} from 'react-router-dom'

const Footer = () => {
  return (
       <footer  className="relative mt-32 border-t border-white/10 bg-white/5 backdrop-blur-xl">

  <div className="max-w-7xl mx-auto px-6 py-16">

    {/* Top Section */}
    <div className="flex flex-col md:flex-row justify-between gap-12">

      {/* Brand */}
      <div>
        <h3 className="text-xl font-semibold bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Prompt2Site
        </h3>
        <p className="mt-4 text-sm text-gray-400 max-w-xs">
          Transform your ideas into production-ready websites instantly with AI-powered generation.
        </p>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">

        <div>
          <h4 className="text-white font-medium mb-4">Product</h4>
          <ul className="space-y-2 text-gray-400">
            <li ><a href="/#features" className="hover:text-white transition cursor-pointer">
      Features
    </a></li>
            <li className="hover:text-white transition cursor-pointer"><Link to="/pricing">Pricing</Link></li>
            <li className="hover:text-white transition cursor-pointer"><Link to="/docs">Docs</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Company</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition cursor-pointer"><Link to="/about">About</Link></li>
            <li className="hover:text-white transition cursor-pointer"><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-medium mb-4">Legal</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="hover:text-white transition cursor-pointer"><Link to="/privacy">Privacy Policy</Link></li>
            <li className="hover:text-white transition cursor-pointer"><Link to="/terms">Terms of Service</Link></li>
          </ul>
        </div>

      </div>

    </div>

    {/* Bottom Section */}
    <div className="mt-16 pt-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
      <p>
        © {new Date().getFullYear()} Prompt2Site. All rights reserved.
      </p>

      <div className="flex gap-6">
        <span className="hover:text-white transition cursor-pointer"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">Instagram</a></span>
        <span className="hover:text-white transition cursor-pointer"><a href="https://github.com/vanshsharma0058" target="_blank" rel="noopener noreferrer">GitHub</a></span>
        <span className="hover:text-white transition cursor-pointer"><a href="https://www.linkedin.com/in/vansh58sharma" target="_blank" rel="noopener noreferrer">LinkedIn</a></span>
      </div>
    </div>

  </div>

</footer>
  )
}

export default Footer
