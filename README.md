# Bookshelf
Midway through last year I found myself between jobs and reading more than usual. I started building [this](https://bookshelf.co.nz) to keep an eye on the stuff I had read. You can customize the categories/ratings that you add books to and share your shelf with others.<br/><br/><br />

![alt Mobile](public/images/mobile.png?raw=true "Mobile")<br/><br/><br/>
![alt Desktop](public/images/desktop.png?raw=true "Desktop")<br/><br/><br/>

## Wiki

The frontend was built with [React](https://reactjs.org/) and the backend is a [.NET Core Web API](https://docs.microsoft.com/en-us/aspnet/core/web-api/?view=aspnetcore-3.1). All the book data is pulled from the [Google Books API](https://developers.google.com/books). Below are some of the articles that helped me out along the way.
 - [How do you wait for the response of a http request in JavaScript?](https://scotch.io/tutorials/javascript-promises-for-dummies)
 - [How do you securely store passwords in a database?](https://medium.com/@mehanix/lets-talk-security-salted-password-hashing-in-c-5460be5c3aae)
 - [What happens when a user forgets their password?](https://stackoverflow.com/questions/1102781/best-way-for-a-forgot-password-implementation)
 - [How do you implement JWT authentication in .NET Core?](https://medium.com/@mmoshikoo/jwt-authentication-using-c-54e0c71f21b0)
 - [How do you send emails in .NET Core?](https://dotnetcoretutorials.com/2017/11/02/using-mailkit-send-receive-email-asp-net-core/)
 - [What are security headers and how do I use them in .NET Core?](https://www.hanselman.com/blog/EasilyAddingSecurityHeadersToYourASPNETCoreWebAppAndGettingAnAGrade.aspx)
 - [How do you install/setup Nginx on a Linux server?](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04)
 - [How do you setup SSL certificates for Nginx?](https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-18-04)
 - [Is my SSL certificate in good nick?](https://www.ssllabs.com/ssltest/)
 - [How do you automate backups to a DigitalOcean space?](https://www.digitalocean.com/community/tutorials/how-to-automate-backups-digitalocean-spaces)

I also wrote a couple of scripts that could be useful if you're working with the same setup.
 - [Build and release frontend](https://github.com/ashmidgley/bookshelf/blob/master/release.sh)
 - [Build and release API](https://github.com/ashmidgley/bookshelf-api/blob/master/Bookshelf.Core/release.sh)
 - [Backup database](https://gist.github.com/ashmidgley/694046e24c5218bfd6eca94c01e8151c)
 - [Restore database](https://gist.github.com/ashmidgley/00a9d9a1a460838fa073675a51388c4a)
