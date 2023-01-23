import { useState, useEffect, useRef } from "react";
import WebViewer from "@pdftron/webviewer";

const Document = () => {
	// const [docs, _] = useState(["/pdf.pdf", "/docx.docx"]),
		const docInstance = useRef(null),
		viewer = useRef(null);

	useEffect(() => {
		WebViewer(
			{
				disableElements: ["panToolButton", "selectToolButton", "toolsButton", "searchButton"],
				path: "/webviewer/lib",
				initialDoc: ["/pdf.pdf", "/docx.docx"],
				isReadOnly: true,
				disableLogs: true,
			},
			viewer.current
		).then(async (instance) => {
			docInstance.current = instance;
			instance.UI.disableElements(["header"]);
			// instance.UI.FitMode.FitPage;
		});
		return () => {
			docInstance?.current?.dispose();
			viewer.current = null;
		}
	}, []);

	return (
		<div className="w-full h-0 min-h-full rounded-b-[10px] overflow-hidden">
			<div className="webviewer h-full" ref={viewer}></div>
		</div>
	);
};

export default Document;
