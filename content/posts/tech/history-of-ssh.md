---
title: The True History of SSH - How a Password Sniffer Led to Secure Remote Access
date: 2026-03-12
tags:
  - tech-history
  - security
  - networking
  - protocols
draft: false
---

# The True History of SSH

In early 1995, a password-sniffing attack swept through the network at Helsinki University of Technology in Finland. Someone had installed packet sniffers on the university's network, capturing thousands of passwords—including several belonging to a young researcher named Tatu Ylönen. This security breach would spark one of the most important developments in network security history.

## The Problem: The Internet Was Built on Trust

To understand why SSH was revolutionary, you need to understand how broken remote access was in the early-to-mid 1990s. The standard tools for remote login were:

- **telnet** - transmitted everything, including passwords, in plaintext
- **rlogin** - slightly more convenient than telnet, equally insecure
- **rsh** (remote shell) - allowed command execution, no encryption
- **FTP** - file transfers with plaintext authentication
- **rcp** (remote copy) - file copying with no security

All of these protocols were designed in an era when the internet was a small, trusted network of universities and research institutions. Security through obscurity was considered sufficient. By the mid-1990s, this was catastrophically inadequate.

## The Creator: Tatu Ylönen

Tatu Ylönen was a researcher at Helsinki University of Technology working on his doctoral thesis. After the password sniffing incident in February 1995, he was frustrated by the lack of secure alternatives. As he later wrote:

> "I had been using telnet, rlogin, and FTP for years. The password sniffer made me realize how vulnerable all my connections really were. I looked for alternatives, but there was nothing readily available that was both secure and easy to use."

Rather than wait for someone else to solve the problem, Ylönen decided to build the solution himself.

## The Creation: Spring 1995

Ylönen began working on SSH in early 1995. His goals were clear:

1. **Replace insecure remote login protocols** with strong encryption
2. **Make it easy to use** - should work as a drop-in replacement
3. **Support authentication** beyond just passwords
4. **Allow secure file transfer** and port forwarding
5. **Work across different platforms** (Unix variants primarily)

He worked intensively on the project for several months, incorporating:

- **RSA encryption** for the key exchange (before software patents became a major issue)
- **DES, 3DES, and Blowfish** for data encryption
- **Public key authentication** as an alternative to passwords
- **X11 forwarding** to run graphical applications securely
- **Compression** to improve performance over slow links

## The Release: July 12, 1995

On July 12, 1995, Ylönen released SSH version 1.0 to the public. He announced it on several mailing lists and made it freely available for academic and non-commercial use. The response was immediate and overwhelming.

Within the first day, Ylönen received hundreds of downloads and thank-you emails. Within months, SSH was being used at thousands of sites worldwide. As he later recalled:

> "The adoption was much faster than I ever anticipated. In the first year, we estimated SSH had 20,000 users in 50 countries. The need had clearly been there all along."

The original SSH (now known as SSH-1) used its own protocol, which Ylönen described in detail in his documentation. The protocol had some known weaknesses, but it was orders of magnitude more secure than telnet.

## The Commercialization: SSH Communications Security

By late 1995, the popularity of SSH was undeniable. Ylönen founded SSH Communications Security Corp in December 1995 to develop and support SSH commercially. Early versions of SSH remained free for academic and non-commercial use, but commercial licenses were required for business use.

This created a complexity: SSH was widely deployed in both academic and commercial environments, and the licensing became increasingly restrictive over time. The community began to grow concerned about the direction of the project.

## SSH-2: A Fresh Start

In 1996, Ylönen and his team began working on a complete redesign: SSH-2. This was necessary because:

1. **SSH-1 had security weaknesses** that couldn't be fixed without breaking compatibility
2. **Patent concerns** around RSA required finding alternatives
3. **Performance improvements** were needed for modern networks
4. **Extensibility** - the protocol needed to be more modular and future-proof

The SSH-2 protocol was a significant improvement:

- New key exchange algorithms (Diffie-Hellman)
- Better authentication methods
- Improved encryption algorithm negotiation
- Better protection against man-in-the-middle attacks
- Separated transport, authentication, and connection protocols

The first SSH-2 implementation was released in 1997, but adoption was slow at first due to compatibility issues and licensing concerns.

## The Fork: OpenSSH

The turning point came in 1999. Theo de Raadt and the OpenBSD team were concerned about the licensing direction of SSH. They found an older version of SSH (version 1.2.12, the last version released under a fully free license) and decided to fork it.

In December 1999, they released **OpenSSH**, a completely free and open-source implementation based on SSH-1 but with rapid improvements:

- Added SSH-2 protocol support
- Removed cryptographic patents (RSA was about to expire anyway)
- Fixed numerous security issues
- Added new features like SFTP (SSH File Transfer Protocol)
- Maintained strict code quality and security auditing

OpenSSH quickly became the de facto standard implementation. Today, it ships with virtually every Unix-like operating system, and according to some estimates, over 90% of SSH connections use OpenSSH.

## The Legacy

SSH fundamentally changed how we think about remote access. Some key impacts:

### Immediate Impact (1995-2000)
- Replaced telnet/rlogin as the standard for remote access
- Made encrypted communication the default, not the exception
- Demonstrated that security could be user-friendly
- Proved that open-source security tools could be trusted

### Long-term Impact (2000-Present)
- **Git and version control**: Git uses SSH for secure repository access
- **Cloud computing**: SSH is the primary access method for cloud servers
- **DevOps**: SSH keys are fundamental to automated deployments
- **Container orchestration**: SSH concepts influenced modern access patterns
- **Security best practices**: Public key authentication became standard

### Modern Usage
Today, SSH is ubiquitous:
- Every Linux/Unix server in the world
- Embedded in automation tools (Ansible, etc.)
- Used by millions of developers daily
- Extended into new protocols (Mosh for mobile)
- Basis for secure tunneling and VPNs

## The Human Element

What makes SSH's story particularly interesting is that it was created by one person, working alone, in response to a specific attack. Tatu Ylönen wasn't backed by a large corporation or government agency. He saw a problem, knew enough about cryptography and networking to solve it, and then did so.

His decision to make it freely available for non-commercial use ensured rapid adoption, and the community's later fork (OpenSSH) ensured that SSH would remain free and trustworthy forever.

## Technical Specifications

For those interested in the technical details:

- **SSH-1**: Described in Ylönen's original documentation (1995)
- **SSH-2**: Standardized as RFCs 4250-4254 (2006)
- **Current version**: SSH-2 is universal; SSH-1 is deprecated
- **OpenSSH**: Maintained by the OpenBSD project since 1999

## References & Further Reading

1. Ylönen, Tatu. "SSH - Secure Login Connections over the Internet." 6th USENIX Security Symposium, 1996.
2. RFC 4251: "The Secure Shell (SSH) Protocol Architecture"
3. OpenSSH project history: https://www.openssh.com/history.html
4. "The Story of SSH" - Interview with Tatu Ylönen (various)
5. Ylönen's original SSH announcement, July 1995 (archived in various forums)

## Conclusion

SSH emerged from a simple need: secure remote access in an increasingly hostile internet. What started as one researcher's response to a password sniffer became the foundation of modern secure communication. 

The story of SSH is a reminder that transformative technology often comes from individuals solving immediate, practical problems—and that making solutions freely available can change the world.

Twenty-eight years after its creation, SSH remains as relevant as ever. Every time you `ssh user@server` or `git push`, you're using technology born from a security incident at a Finnish university in 1995.

---

*Last updated: March 12, 2026*
