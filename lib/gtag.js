export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_SITE_ID;

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (title, url) => {
  if (window && window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_path: url,
      send_to: GA_TRACKING_ID,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  if (window && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
