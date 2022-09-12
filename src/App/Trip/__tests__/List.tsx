/* eslint-disable testing-library/no-node-access */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { App } from '../../App'
import { List } from '../List'

/**
 * Note: These tests are just sanity checks and would probably be more thorough in a real app.
 */

it('renders', async () => {
  render(
    <App>
      <List />
    </App>
  )

  // a loading spinner should be displayed while fetching the data
  await waitFor(() => {
    expect(screen.getByTitle(`Loading`)).toBeInTheDocument()
  })

  // wait for the data to load
  await waitFor(() => {
    expect(screen.queryByTitle(`Loading`)).not.toBeInTheDocument()
  })

  // confirm each trip title
  expect(screen.getByText(`European Quest`)).toBeInTheDocument()
  expect(screen.getByText(`Autumn Roadtrip`)).toBeInTheDocument()
  expect(screen.getByText(`Diving adventure in Egypt`)).toBeInTheDocument()

  // confirm each trip countries/days
  expect(screen.getByText(`8 countries, 21 days`)).toBeInTheDocument()
  expect(screen.getByText(`1 country, 14 days`)).toBeInTheDocument()
  expect(screen.getByText(`1 country, 5 days`)).toBeInTheDocument()

  // confirm each emissions offset
  expect(screen.getByText((content) => content.startsWith(`810 kg CO`))).toBeInTheDocument()
  expect(screen.getByText((content) => content.startsWith(`3.56 t CO`))).toBeInTheDocument()
  expect(screen.getByText((content) => content.startsWith(`6.92 t CO`))).toBeInTheDocument()

  // confirm each rating
  expect(screen.getByText(`4.7`)).toBeInTheDocument()
  expect(screen.getByText(`4.3`)).toBeInTheDocument()
  expect(screen.getByText(`3.9`)).toBeInTheDocument()
})
