import WebViewer from "@pdftron/webviewer";
import { useState, useEffect, useRef } from "react";

const Document = () => {
	const [docs, setDocs] = useState(["/docx.docx", "/pdf.pdf"]),

		docInstance = useRef(null),
		viewer = useRef(null);

	// useEffect(() => {
	// 	import("@pdftron/webviewer").then(() => {
	// 		WebViewer(
	// 			{
	// 				disableElements: ["panToolButton", "selectToolButton", "toolsButton", "searchButton"],
	// 				path: "/webviewer/lib",
	// 				initialDoc: docs,
	// 				isReadOnly: true,
	// 				disableLogs: true
	// 			},
	// 			viewer.current
	// 		).then(async (instance) => {
	// 			docInstance.current = instance;
	// 			instance.UI.disableElements([
	// 				"header",
	// 			]);
	// 			// instance.UI.FitMode.FitPage;
	// 		});
	// 	});
	// 	return () => docInstance.current.dispose();
	// }, [docs]);

	return (
		<div className="w-full h-0 min-h-full rounded-b-[10px] overflow-hidden">
			<div className="webviewer h-full" ref={viewer}></div>
		</div>
	);
};

export default Document;
