import { jsx, jsxs } from "react/jsx-runtime";
function IconDiscard(props) {
  const fillColor = props.fill || "#333333";
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      viewBox: "0 0 20 20",
      fill: "none",
      ...props,
      children: [
        /* @__PURE__ */ jsx("title", { children: "Clear" }),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M11.5 8.25C11.9142 8.25 12.25 8.58579 12.25 9V13.25C12.25 13.6642 11.9142 14 11.5 14C11.0858 14 10.75 13.6642 10.75 13.25V9C10.75 8.58579 11.0858 8.25 11.5 8.25Z",
            fill: fillColor
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: "M9.25 9C9.25 8.58579 8.91421 8.25 8.5 8.25C8.08579 8.25 7.75 8.58579 7.75 9V13.25C7.75 13.6642 8.08579 14 8.5 14C8.91421 14 9.25 13.6642 9.25 13.25V9Z",
            fill: fillColor
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            fillRule: "evenodd",
            clipRule: "evenodd",
            d: "M7.24994 5.25C7.24994 3.73122 8.48116 2.5 9.99994 2.5C11.5187 2.5 12.7499 3.73122 12.7499 5.25H15.75C16.1642 5.25 16.5 5.58579 16.5 6C16.5 6.41421 16.1642 6.75 15.75 6.75H14.9999L14.9998 12.2001C14.9998 13.8802 14.9997 14.7203 14.6728 15.362C14.3851 15.9265 13.9262 16.3854 13.3617 16.673C12.72 17 11.8799 17 10.1997 17H9.79999C8.11978 17 7.27968 17 6.63793 16.673C6.07343 16.3854 5.61448 15.9264 5.32687 15.3619C4.99989 14.7202 4.9999 13.8801 4.99994 12.1999L5.00005 6.75H4.25C3.83579 6.75 3.5 6.41421 3.5 6C3.5 5.58579 3.83579 5.25 4.25 5.25H7.24994ZM8.74994 5.25C8.74994 4.55964 9.30958 4 9.99994 4C10.6903 4 11.2499 4.55964 11.2499 5.25H8.74994ZM6.50007 6.75H13.4999L13.4998 12.2001C13.4998 13.0649 13.4986 13.6233 13.4639 14.0483C13.4305 14.4558 13.374 14.6068 13.3362 14.681C13.1924 14.9632 12.963 15.1927 12.6807 15.3365C12.6065 15.3743 12.4555 15.4308 12.048 15.4641C11.623 15.4988 11.0646 15.5 10.1997 15.5H9.79999C8.93513 15.5 8.37671 15.4988 7.95169 15.4641C7.54418 15.4308 7.3931 15.3743 7.31893 15.3365C7.03668 15.1927 6.80721 14.9632 6.6634 14.681C6.62561 14.6068 6.56909 14.4557 6.53581 14.0482C6.50109 13.6232 6.49994 13.0648 6.49995 12.1999L6.50007 6.75Z",
            fill: fillColor
          }
        )
      ]
    }
  );
}
export {
  IconDiscard
};
