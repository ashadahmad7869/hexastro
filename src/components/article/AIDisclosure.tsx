export default function AIDisclosure({ reviewerName }: { reviewerName?: string }) {
  return (
    <p style={{
      marginTop: '2.5rem',
      paddingTop: '1rem',
      borderTop: '1px solid var(--border-color)',
      fontSize: '0.8125rem',
      fontStyle: 'italic',
      color: 'var(--text-tertiary, var(--text-secondary))',
    }}>
      Drafted with AI · reviewed and edited by {reviewerName ?? 'HexAstro'}.
    </p>
  )
}
