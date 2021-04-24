import React from "react"
import { css } from "emotion"

const Div: React.FC = ({
  children,
  className: customClassName,
  "data-aos": dataAOS,
  forwardedRef,
  onClick,
  style: customStyle,
  tabIndex,
  ...props
}) => {
  // 1. apply base style
  const style = [styles.baseStyle]

  // 2. apply custom style
  style.push(customStyle)
  style.push(customClassName)

  // 3. apply prop style
  for (const key of Object.keys(props)) {
    if (props[key] === true && styles[key]) {
      style.push(styles[key])
    }

    switch (key) {
      case "mh":
        style.push(css({ marginLeft: props[key], marginRight: props[key] }))
        break
      case "mv":
        style.push(css({ marginTop: props[key], marginBottom: props[key] }))
        break
      case "mt":
        style.push(css({ marginTop: props[key] }))
        break
      case "mb":
        style.push(css({ marginBottom: props[key] }))
        break
      case "ml":
        style.push(css({ marginLeft: props[key] }))
        break
      case "mr":
        style.push(css({ marginRight: props[key] }))
        break
      case "m":
        style.push(css({ margin: props[key] }))
        break
      case "ph":
        style.push(css({ paddingLeft: props[key], paddingRight: props[key] }))
        break
      case "pv":
        style.push(css({ paddingTop: props[key], paddingBottom: props[key] }))
        break
      case "pt":
        style.push(css({ paddingTop: props[key] }))
        break
      case "pb":
        style.push(css({ paddingBottom: props[key] }))
        break
      case "pl":
        style.push(css({ paddingLeft: props[key] }))
        break
      case "pr":
        style.push(css({ paddingRight: props[key] }))
        break
      case "p":
        style.push(css({ padding: props[key] }))
        break
      case "w":
        style.push(css({ width: props[key] }))
        break
      case "h":
        style.push(css({ height: props[key] }))
        break
      case "size":
        style.push(css({ width: props[key], height: props[key] }))
        break
      case "borderColor":
        style.push(css({ border: "solid", borderColor: props[key] }))
        break
      case "backgroundColor":
      case "borderRadius":
      case "borderWidth":
      case "maxWidth":
      case "minWidth":
      case "zIndex":
      case "overflow":
      case "overflowX":
      case "overflowY":
        style.push(css({ [key]: props[key] }))
        break
      default:
        break
    }
  }

  return (
    <div
      ref={forwardedRef}
      className={css(style)}
      onClick={onClick}
      data-aos={dataAOS}
      tabIndex={tabIndex}
    >
      {children}
    </div>
  )
}

const styles = {
  baseStyle: css({
    display: "flex",
    flexDirection: "column",
  }),
  row: css({
    flexDirection: "row",
  }),
  fill: css({
    flex: 1,
  }),
  alignSelfCenter: css({
    alignSelf: "center",
  }),
  alignItemsCenter: css({
    alignItems: "center",
  }),
  center: css({
    alignItems: "center",
    justifyContent: "center",
  }),
  alignItemsStart: css({
    alignItems: "flex-start",
  }),
  alignItemsEnd: css({
    alignItems: "flex-end",
  }),
  justifyContentCenter: css({
    justifyContent: "center",
  }),
  justifyContentBetween: css({
    justifyContent: "space-between",
  }),
}

export default React.forwardRef((props, ref) => (
  <Div forwardedRef={ref} {...props} />
))
