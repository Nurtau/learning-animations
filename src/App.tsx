import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import styled, { createGlobalStyle } from "styled-components";

export const App = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const innerBox = (
		<InnerBox
			variants={innerBoxVariants}
			drag
			dragConstraints={containerRef}
			whileTap={innerBoxOnTap}
		></InnerBox>
	);
	return (
		<div>
			<Global />
			<Container>
				<Box
					ref={containerRef}
					variants={boxVariants}
					animate={isOpen ? "open" : ""}
					transition={{ duration: 0.3 }}
				>
					<StyledButton onClick={() => setIsOpen((state) => !state)}>
						{isOpen ? "Close" : "Open"}
					</StyledButton>
					{innerBox}
					{innerBox}
					{innerBox}
				</Box>
			</Container>
		</div>
	);
};

const Global = createGlobalStyle`
	* {	
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	
`;

const Container = styled.div`
	/* display: flex;
	justify-content: center;
	align-items: center; */
	width: 100%;
	height: 100vh;
	background-color: white;
	overflow: hidden;
`;

const Box = styled(motion.div)`
	height: 100px;
	width: 100px;
	background: blue;
	border-radius: 0 0% 80% 0%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;
`;

const InnerBox = styled(motion.div)`
	display: none;
	border: 1px solid blue;
`;

const StyledButton = styled.button`
	background: transparent;
	border: 0;
	color: white;
	font-size: 20px;
	font-weight: bold;
	position: absolute;
	left: 0.2rem;
	top: 1.1rem;
	padding: 1rem;
`;

const boxVariants = {
	open: {
		width: "100%",
		height: "100%",
		borderRadius: 0,
		backgroundColor: "#6e6ed5",
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.5,
			ease: "easeOut"
		},
	},
};

const innerBoxVariants = {
	open: {
		display: "block",
		width: "100px",
		height: "100px",
		backgroundColor: "yellow",
		rotate: 270,
		borderRadius: "50%",
		transition: {
			ease: "easeOut"
		}
	},
};

const innerBoxOnTap = {
	scale: [1, 1.5, 1.5, 1, 1],
	rotate: [0, 0, 270, 270, 0],
	borderRadius: ["20%", "20%", "50%", "50%", "20%"],
	transition: {
		duration: 2,
	},
};
