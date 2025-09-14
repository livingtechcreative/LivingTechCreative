import '@testing-library/jest-dom'

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R
      toHaveClass(...classNames: string[]): R
      toHaveAttribute(attr: string, value?: string): R
      toHaveStyle(css: string | Record<string, any>): R
      toBeEnabled(): R
      toBeDisabled(): R
      toBeVisible(): R
      toBeEmptyDOMElement(): R
      toHaveTextContent(text: string | RegExp): R
      toHaveValue(value: string | string[] | number): R
      toBeChecked(): R
      toBePartiallyChecked(): R
      toHaveFocus(): R
      toBeRequired(): R
      toBeInvalid(): R
      toBeValid(): R
    }
  }
}
