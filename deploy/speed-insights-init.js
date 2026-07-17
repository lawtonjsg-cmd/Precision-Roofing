/**
 * Vercel Speed Insights Initialization
 * 
 * This script initializes Vercel Speed Insights for performance monitoring.
 * Speed Insights automatically tracks Web Vitals and other performance metrics.
 * 
 * Documentation: https://vercel.com/docs/speed-insights
 * 
 * Note: This creates a queue that will be processed once the Speed Insights
 * script loads from Vercel's CDN (injected automatically after deployment).
 */

window.si = window.si || function () { 
  (window.siq = window.siq || []).push(arguments); 
};
