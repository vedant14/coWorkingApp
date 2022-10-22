import React from "react";
import { SubscribeForm } from "../SubscribeForm";
import { FooterWrapper, LogoWrapper } from "./styles";
import Link from "next/link";

export function Footer() {
	return (
		<FooterWrapper id="Footer">
			<div className="Container">
				<div>
					<LogoWrapper src="/logo.png" alt="Logo" />
					<p>Initially created to fight my own imposter syndrome. </p>
				</div>
				<ul className="footer-link">
					<li className="head">Pages</li>
					<li>
						<Link href="/#">Home</Link>
					</li>
					<li>
						<Link href="/first-test">New? Start here</Link>
					</li>
					<li>
						<Link href="/explore-more">View all tests</Link>
					</li>
				</ul>
				<ul className="footer-link">
					<li className="head">Others</li>
					<li>Templates (coming soon)</li>
				</ul>

				<SubscribeForm />
			</div>
		</FooterWrapper>
	);
}
