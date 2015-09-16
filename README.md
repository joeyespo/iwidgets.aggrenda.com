Aggrenda iWidget Server
=======================

Renders [Aggrenda calendar](http://aggrenda.com) widgets as images.

This is intended to be used in `<img>` elements, especially in environments
where `<iframe>` isn't supported (e.g. email and certain blog frameworks).


## Usage

```html
<a href="http://aggrenda.com/:username/:calendar" title="Click for details" target="_blank">
  <img src="http://iwidgets.aggrenda.com/:username/:calendar/:view/embed" alt="Events" />
</a>
```

Note the trailing `embed` in the image URL. This is required.

#### Parameters

- `:username` your username
- `:calendar` the calendar you'd like to show
- `:view` is either `monthly`, `list`, or `next-event`

#### Available URL arguments

- `width` the width to render to
- `min-height` the minimum height of the resulting image
- `footer` whether to show the footer from the widget
- `separator` whether to show a separator between the calendar and the footer
- `source` whether to show the name of the source calendar in the footer
- `promotion` whether to show Aggrenda in the footer
- `empty-message` the message to display when there are no events to display
- `past` if present, renders past events instead of upcoming


## Examples

**Note**: What you're seeing here is *live calendar data*. Click an
example to visit the source calendar on aggrenda.com. Keep in mind that
GitHub's aggressive caching may cause a delay here.

### Example: Monthly calendar

```html
<a href="http://aggrenda.com/joeyespo/technology-events/monthly">
  <img src="http://iwidgets.aggrenda.com/joeyespo/technology-events/monthly/embed" />
</a>
```

<a href="http://aggrenda.com/joeyespo/technology-events/monthly" target="_blank">
  <img src="http://iwidgets.aggrenda.com/joeyespo/technology-events/monthly/embed?width=728" width="728" />
</a>

---

### Example: Next three upcoming events

```html
<a href="http://aggrenda.com/joeyespo/technology-events">
  <img src="http://iwidgets.aggrenda.com/joeyespo/technology-events/list/embed?page-size=3"/>
</a>
```

<a href="http://aggrenda.com/joeyespo/technology-events" target="_blank">
  <img src="http://iwidgets.aggrenda.com/joeyespo/technology-events/list/embed?width=728&page-size=3" width="728" />
</a>
